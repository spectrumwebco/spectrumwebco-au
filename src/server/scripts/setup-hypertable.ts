import sequelize from '../config/database';
import PageView from '../models/PageView';

async function setupHypertable() {
  try {
    // Drop the existing table if it exists
    await sequelize.query('DROP TABLE IF EXISTS page_views CASCADE');
    console.log('✅ Dropped existing page_views table if it existed');

    // Create the table with a composite primary key that includes created_at
    await sequelize.query(`
      CREATE TABLE page_views (
        id SERIAL,
        url VARCHAR(255) NOT NULL,
        user_id VARCHAR(100),
        session_id VARCHAR(100) NOT NULL,
        referrer VARCHAR(255),
        user_agent TEXT,
        ip_address VARCHAR(45),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (id, created_at)
      )
    `);

    console.log('✅ PageView table created with composite primary key');

    // Create indexes
    await sequelize.query('CREATE INDEX page_views_url_idx ON page_views (url)');
    await sequelize.query('CREATE INDEX page_views_session_id_idx ON page_views (session_id)');

    console.log('✅ Indexes created');

    // Check if the table is already a hypertable
    const [isHypertable] = await sequelize.query(`
      SELECT * FROM timescaledb_information.hypertables
      WHERE hypertable_name = 'page_views'
    `);

    if (Array.isArray(isHypertable) && isHypertable.length > 0) {
      console.log('✅ PageView table is already a hypertable');
    } else {
      // Convert the table to a TimescaleDB hypertable
      await sequelize.query(`
        SELECT create_hypertable('page_views', 'created_at',
          chunk_time_interval => interval '1 day',
          if_not_exists => TRUE
        )
      `);
      console.log('✅ PageView table converted to a hypertable');
    }

    // Create a retention policy (optional) - keep data for 1 year
    await sequelize.query(`
      SELECT add_retention_policy('page_views',
        INTERVAL '1 year',
        if_not_exists => TRUE
      )
    `);
    console.log('✅ Retention policy added (data will be kept for 1 year)');

    // Enable compression on the hypertable
    try {
      await sequelize.query(`
        ALTER TABLE page_views SET (
          timescaledb.compress,
          timescaledb.compress_segmentby = 'url,session_id'
        )
      `);
      console.log('✅ Compression enabled on hypertable');

      // Create a compression policy (optional) - compress chunks older than 7 days
      await sequelize.query(`
        SELECT add_compression_policy('page_views',
          INTERVAL '7 days',
          if_not_exists => TRUE
        )
      `);
      console.log('✅ Compression policy added (chunks older than 7 days will be compressed)');
    } catch (error) {
      console.warn('⚠️ Could not enable compression or add compression policy:', error);
    }

    console.log('✅ TimescaleDB hypertable setup complete');
  } catch (error) {
    console.error('❌ Error setting up hypertable:', error);
  } finally {
    await sequelize.close();
  }
}

// Run the setup function
setupHypertable().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});

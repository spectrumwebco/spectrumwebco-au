import sequelize, { testConnection } from '../config/database';

async function main() {
  try {
    // Test the database connection
    await testConnection();
    
    // Define a model for pg_extension to query extensions
    const Extension = sequelize.define('Extension', {
      extname: sequelize.Sequelize.STRING,
      extversion: sequelize.Sequelize.STRING,
    }, {
      tableName: 'pg_extension',
      timestamps: false
    });

    // Query all extensions
    const extensions = await Extension.findAll({ attributes: ['extname', 'extversion'] });
    console.log('Installed PostgreSQL extensions:');
    console.table(extensions.map(e => e.dataValues));
  } catch (error) {
    console.error('Error testing database connection:', error);
  } finally {
    // Close the connection
    await sequelize.close();
  }
}

// Run the main function
main().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});

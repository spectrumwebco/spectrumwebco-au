import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database connection parameters
const DB_URL = process.env.DATABASE_URL || 'postgres://tsdbadmin:bsmmhv8m1e0jl5d8@ug8z3pun0a.nze8xmzeoc.tsdb.cloud.timescale.com:39082/tsdb';

// Create Sequelize instance
const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Use this only in development
    }
  },
  logging: process.env.NODE_ENV !== 'production',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: true
  }
});

// Function to test the database connection
export const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✅ TimescaleDB connection has been established successfully.');

    // Check for TimescaleDB extension
    const [results] = await sequelize.query('SELECT extname, extversion FROM pg_extension WHERE extname = \'timescaledb\'');

    if (Array.isArray(results) && results.length > 0) {
      console.log(`✅ TimescaleDB extension found: ${JSON.stringify(results[0])}`);
    } else {
      console.warn('⚠️ TimescaleDB extension not found. Some time-series functionality may not be available.');
    }
  } catch (error) {
    console.error('❌ Unable to connect to the TimescaleDB database:', error);
    throw error;
  }
};

export default sequelize;

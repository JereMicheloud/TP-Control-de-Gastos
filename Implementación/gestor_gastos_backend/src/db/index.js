// filepath: gestor_gastos_backend/src/db/index.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log('Initializing database connection...');
console.log('DB Config:', {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER ? '***' : 'NOT SET'
});

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: 'postgres',
    logging: console.log, // Enable SQL logging
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const connect = async () => {
  try {
    console.log('Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ PostgreSQL (Supabase) connected successfully');
    
    // Test a simple query
    const result = await sequelize.query('SELECT version();');
    console.log('Database version:', result[0][0].version);
    
  } catch (error) {
    console.error('❌ PostgreSQL connection failed:', error.message);
    console.error('Full error:', error);
    throw error;
  }
};

module.exports = { sequelize, connect };
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const transactionRoutes = require('./routes/transactions');
const authRoutes = require('./routes/auth');
const db = require('./db/index');
const Transaction = require('./models/transaction');
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', authRoutes);

// Database connection
db.connect()
  .then(async () => {
    console.log('Starting database sync...');
    
    // Force sync to recreate tables if needed
    await db.sequelize.sync({ force: false, alter: true });
    
    console.log('Database synced successfully with Supabase');
    console.log('Models registered:', db.sequelize.models);
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log('Environment variables loaded:');
      console.log('- PG_HOST:', process.env.PG_HOST);
      console.log('- PG_DATABASE:', process.env.PG_DATABASE);
      console.log('- PG_USER:', process.env.PG_USER ? '***' : 'NOT SET');
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });
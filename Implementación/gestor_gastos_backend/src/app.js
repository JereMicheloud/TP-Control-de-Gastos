require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const transactionRoutes = require('./routes/transactions');
const authRoutes = require('./routes/auth');
const db = require('./db/index');
const models = require('./models/index');

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
    
    // Sync database with proper relationships
    // In production, use alter: true instead of force: true to preserve data
    const isProduction = process.env.NODE_ENV === 'production';
    await models.sequelize.sync({ 
      force: false, 
      alter: !isProduction // Only alter schema in development
    });
    
    console.log('Database synced successfully with Supabase');
    console.log('Models registered:', Object.keys(models));
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on http://0.0.0.0:${PORT}`);
      console.log('Environment variables loaded:');
      console.log('- NODE_ENV:', process.env.NODE_ENV);
      console.log('- PG_HOST:', process.env.PG_HOST);
      console.log('- PG_DATABASE:', process.env.PG_DATABASE);
      console.log('- PG_USER:', process.env.PG_USER ? '***' : 'NOT SET');
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });
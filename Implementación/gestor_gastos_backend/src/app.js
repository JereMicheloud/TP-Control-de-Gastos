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
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174', 
        'https://gestor-gastos-frontend.onrender.com',
        /\.onrender\.com$/
    ],
    credentials: true
}));
app.use(bodyParser.json());

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend funcionando correctamente',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Test route for CORS
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'CORS funcionando correctamente',
    origin: req.headers.origin 
  });
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
        console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
        console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });
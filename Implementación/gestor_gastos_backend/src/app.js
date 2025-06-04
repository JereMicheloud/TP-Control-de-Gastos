const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const transactionRoutes = require('./routes/transactions');
const authRoutes = require('./routes/auth');
const db = require('./db/index');
const Transaction = require('./models/transaction'); // Asegura que el modelo se registre
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', authRoutes);

// Database connection
db.connect()
  .then(async () => {
    await db.sequelize.sync(); // Sincroniza todos los modelos
    console.log('Database synced successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });
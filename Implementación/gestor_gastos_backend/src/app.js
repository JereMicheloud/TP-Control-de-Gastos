const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const transactionRoutes = require('./routes/transactions');
const db = require('./db/index');
const Transaction = require('./models/transaction'); // Asegura que el modelo se registre

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/transactions', transactionRoutes);

// Database connection
db.connect()
  .then(async () => {
    await db.sequelize.sync(); // Sincroniza modelos con la base de datos
    console.log('Database synced successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });
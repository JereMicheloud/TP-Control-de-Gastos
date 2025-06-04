const express = require('express');
const transactionsController = require('../controllers/transactionsController');
const jwt = require('jsonwebtoken');

const router = express.Router();

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
}

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Route to create a new transaction
router.post('/', transactionsController.createTransaction);

// Route to get all transactions
router.get('/', transactionsController.getAllTransactions);

// Route to get a transaction by ID
router.get('/:id', transactionsController.getTransactionById);

// Route to update a transaction by ID
router.put('/:id', transactionsController.updateTransaction);

// Route to delete a transaction by ID
router.delete('/:id', transactionsController.deleteTransaction);

module.exports = router;
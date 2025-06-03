const express = require('express');
const transactionsController = require('../controllers/transactionsController');

const router = express.Router();

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
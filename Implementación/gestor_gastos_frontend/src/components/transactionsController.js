const Transaction = require('../models/transaction');

class TransactionsController {
  async createTransaction(req, res) {
    try {
      const transaction = await Transaction.create(req.body);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ message: 'Error creating transaction', error });
    }
  }

  async getAllTransactions(req, res) {
    try {
      const transactions = await Transaction.find();
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching transactions', error });
    }
  }

  async getTransactionById(req, res) {
    try {
      const transaction = await Transaction.findById(req.params.id);
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching transaction', error });
    }
  }

  async updateTransaction(req, res) {
    try {
      const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json({ message: 'Error updating transaction', error });
    }
  }

  async deleteTransaction(req, res) {
    try {
      const transaction = await Transaction.findByIdAndDelete(req.params.id);
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting transaction', error });
    }
  }
}

module.exports = new TransactionsController();
const Transaction = require('../models/transaction');

class TransactionsController {
  async createTransaction(req, res) {
    try {
      console.log('=== CREATE TRANSACTION ===');
      console.log('User ID:', req.user.userId);
      console.log('Request body:', req.body);
      
      // Validate required fields
      const { description, amount, type, category, date } = req.body;
      
      if (!amount || !type || !category || !date) {
        console.log('Missing required fields');
        return res.status(400).json({ 
          message: 'Missing required fields', 
          required: ['amount', 'type', 'category', 'date'],
          received: req.body
        });
      }

      const transactionData = {
        description: description || '',
        amount: parseFloat(amount),
        type,
        category,
        date,
        userId: req.user.userId
      };

      console.log('Transaction data to save:', transactionData);
      
      const transaction = await Transaction.create(transactionData);
      
      console.log('Transaction created successfully:', transaction.toJSON());
      res.status(201).json(transaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
      res.status(500).json({ 
        message: 'Error creating transaction', 
        error: error.message,
        details: error.original?.message || 'No additional details'
      });
    }
  }

  async getAllTransactions(req, res) {
    try {
      console.log('=== GET ALL TRANSACTIONS ===');
      console.log('User ID:', req.user.userId);
      
      const transactions = await Transaction.findAll({ 
        where: { userId: req.user.userId },
        order: [['date', 'DESC'], ['createdAt', 'DESC']]
      });
      
      console.log(`Found ${transactions.length} transactions for user ${req.user.userId}`);
      res.status(200).json(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ message: 'Error fetching transactions', error: error.message });
    }
  }

  async getTransactionById(req, res) {
    try {
      console.log('=== GET TRANSACTION BY ID ===');
      console.log('User ID:', req.user.userId);
      console.log('Transaction ID:', req.params.id);
      
      const transaction = await Transaction.findOne({
        where: { 
          id: req.params.id,
          userId: req.user.userId // Asegura que el usuario solo pueda ver sus propias transacciones
        }
      });
      
      if (!transaction) {
        console.log('Transaction not found');
        return res.status(404).json({ message: 'Transaction not found' });
      }
      
      console.log('Transaction found:', transaction.toJSON());
      res.status(200).json(transaction);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      res.status(500).json({ message: 'Error fetching transaction', error: error.message });
    }
  }

  async updateTransaction(req, res) {
    try {
      console.log('=== UPDATE TRANSACTION ===');
      console.log('User ID:', req.user.userId);
      console.log('Transaction ID:', req.params.id);
      console.log('Request body:', req.body);
      
      const transaction = await Transaction.findOne({
        where: { 
          id: req.params.id,
          userId: req.user.userId // Asegura que el usuario solo pueda modificar sus propias transacciones
        }
      });
      
      if (!transaction) {
        console.log('Transaction not found');
        return res.status(404).json({ message: 'Transaction not found' });
      }
      
      // Validate and parse amount
      if (req.body.amount !== undefined) {
        if (isNaN(req.body.amount) || parseFloat(req.body.amount) <= 0) {
          console.log('Invalid amount');
          return res.status(400).json({ message: 'Invalid amount' });
        }
        req.body.amount = parseFloat(req.body.amount);
      }

      await transaction.update(req.body);
      console.log('Transaction updated successfully:', transaction.toJSON());
      res.status(200).json(transaction);
    } catch (error) {
      console.error('Error updating transaction:', error);
      res.status(500).json({ message: 'Error updating transaction', error: error.message });
    }
  }

  async deleteTransaction(req, res) {
    try {
      console.log('=== DELETE TRANSACTION ===');
      console.log('User ID:', req.user.userId);
      console.log('Transaction ID:', req.params.id);
      
      const transaction = await Transaction.findOne({
        where: { 
          id: req.params.id,
          userId: req.user.userId // Solo puede eliminar sus propias transacciones
        }
      });
      
      if (!transaction) {
        console.log('Transaction not found');
        return res.status(404).json({ message: 'Transaction not found' });
      }
      
      await transaction.destroy();
      console.log('Transaction deleted:', req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting transaction:', error);
      res.status(500).json({ message: 'Error deleting transaction', error: error.message });
    }
  }
}

module.exports = new TransactionsController();
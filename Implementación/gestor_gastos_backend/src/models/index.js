// filepath: gestor_gastos_backend/src/models/index.js
const { sequelize } = require('../db/index');
const User = require('./user');
const Transaction = require('./transaction');

// Define relationships
User.hasMany(Transaction, { 
  foreignKey: 'userId',
  as: 'transactions'
});

Transaction.belongsTo(User, { 
  foreignKey: 'userId',
  as: 'user'
});

const models = {
  User,
  Transaction,
  sequelize
};

module.exports = models;

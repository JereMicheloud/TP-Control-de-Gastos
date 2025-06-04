// filepath: gestor_gastos_backend/src/models/transaction.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/index');

const Transaction = sequelize.define('Transaction', {
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('ingreso', 'egreso'),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'transactions',
});

module.exports = Transaction;
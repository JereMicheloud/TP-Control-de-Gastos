// filepath: gestor_gastos_backend/src/models/transaction.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/index');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0.01
    }
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
    references: {
      model: 'users',
      key: 'id'
    }
  },
}, {
  timestamps: true,
  tableName: 'transactions',
});

console.log('Transaction model defined');

module.exports = Transaction;
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/index');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true,
  tableName: 'users',
});

module.exports = User;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('Admin', 'Librarian', 'Member'), allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    isConfirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = User;
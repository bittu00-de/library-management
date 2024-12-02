const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Book = require('./book');

const BorrowedBook = sequelize.define('BorrowedBook', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
    bookId: { type: DataTypes.INTEGER, references: { model: Book, key: 'id' } },
    borrowedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    returnedAt: { type: DataTypes.DATE, allowNull: true },
});

module.exports = BorrowedBook;

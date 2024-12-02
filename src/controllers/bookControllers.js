const Book = require('../models/book');
const Joi = require('joi');

// Add a new book
exports.addBook = async (req, res) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        isAvailable: Joi.boolean(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const book = await Book.create(value);
        res.status(201).send(book);
    } catch (err) {
        res.status(500).send({ error: 'Failed to add book', details: err.message });
    }
};

// Update an existing book
exports.updateBook = async (req, res) => {
    const schema = Joi.object({
        title: Joi.string(),
        author: Joi.string(),
        isAvailable: Joi.boolean(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) return res.status(404).send('Book not found');

        await book.update(value);
        res.status(200).send(book);
    } catch (err) {
        res.status(500).send({ error: 'Failed to update book', details: err.message });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) return res.status(404).send('Book not found');

        await book.destroy();
        res.status(200).send({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).send({ error: 'Failed to delete book', details: err.message });
    }
};

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).send(books);
    } catch (err) {
        res.status(500).send({ error: 'Failed to retrieve books', details: err.message });
    }
};
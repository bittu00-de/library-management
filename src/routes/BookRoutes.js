const express = require('express');
const { addBook, updateBook, deleteBook, getAllBooks } = require('../controllers/bookControllers');
const { authenticate } = require('../middlewares/authMiddleware');
const { isAdmin, isLibrarianOrAdmin } = require('../middlewares/roleMiddleware');
const router = express.Router();

// Admin: Add a new book
router.post('/', authenticate, isAdmin, addBook);

// Admin: Update a book
router.put('/:id', authenticate, isAdmin, updateBook);

// Admin: Delete a book
router.delete('/:id', authenticate, isAdmin, deleteBook);

// Librarian or Member: View all books
router.get('/', authenticate, isLibrarianOrAdmin, getAllBooks);

module.exports = router;
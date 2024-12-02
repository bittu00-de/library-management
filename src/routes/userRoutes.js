const express = require('express');
const { createUser, updateUser, deleteUser, getUsers } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');
const router = express.Router();

// Admin: Create a new user
router.post('/', authenticate, isAdmin, createUser);

// Admin: Update a user
router.put('/:id', authenticate, isAdmin, updateUser);

// Admin: Delete a user
router.delete('/:id', authenticate, isAdmin, deleteUser);

// Admin: Get all users
router.get('/', authenticate, isAdmin, getUsers);

module.exports = router;
const User = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const generatePassword = require('../utils/generatePassword');

// Create a new user
exports.createUser = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        role: Joi.string().valid('Librarian', 'Member').required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const password = generatePassword(value.name, value.email, value.phone);
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({ ...value, password: hashedPassword });
        res.status(201).send(user);
    } catch (err) {
        res.status(500).send({ error: 'Failed to create user', details: err.message });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        phone: Joi.string(),
        role: Joi.string().valid('Librarian', 'Member'),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).send('User not found');

        await user.update(value);
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ error: 'Failed to update user', details: err.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).send('User not found');

        await user.destroy();
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).send({ error: 'Failed to delete user', details: err.message });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ error: 'Failed to retrieve users', details: err.message });
    }
};
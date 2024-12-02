const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generatePassword = require('../utils/generatePassword');
const Joi = require('joi');
require('dotenv').config();

exports.register = async (req, res) => {
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
        res.status(201).send({ message: 'Registered successfully. Await admin confirmation.' });
    } catch (err) {
        res.status(500).send({ error: 'User creation failed', details: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).send('User not found');

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).send('Invalid credentials');

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.status(200).send({ token });
    } catch (err) {
        res.status(500).send(err.message);
    }
};
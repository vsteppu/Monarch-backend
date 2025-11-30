import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import DailyExercise from '../models/DailyExercise.js';
import UserParameters from '../models/UserParameters.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hash = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, email, password: hash });
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;

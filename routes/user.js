import express from 'express';
import User from '../models/User.js'

const router = express.Router();

router.post('/user', async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            res.status(200).json(existingUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;

// controllers/login-controller.js
import User from "../models/User.js";

const getUserController = async (req, res) => {
    const { id } = req.query;

    try {
        const user = await User.findOne({ where: { id } });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

export default getUserController;
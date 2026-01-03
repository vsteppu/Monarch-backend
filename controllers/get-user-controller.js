// controllers/login-controller.js
import User from "../models/User.js";

const getUserController = async (req, res) => {
    const { id } = req.query;
    try {
        console.log('$123');
        const user = await User.findOne({ where: { id } });
        console.log('user: ', user);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

export default getUserController;
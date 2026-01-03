// controllers/login-controller.js
import User from "../models/User.js";
import UserParameters from "../models/UserParameters.js";

const getUserController = async (req, res) => {
    const { id } = req.query;

    try {
        const meta = await UserParameters.findOne({ where: { user_id: id } });

        if (!meta) {
            res.status(404).json({ message: 'User parameters not found' });
        } else {
            res.status(200).json({ success: true, meta});
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

export default getUserController;
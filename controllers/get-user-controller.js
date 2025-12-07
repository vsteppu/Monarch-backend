// controllers/login-controller.js
import User from "../models/User.js";
import UserParameters from "../models/UserParameters.js";

const getUserController = async (req, res) => {
    const { id } = req.query;

    try {
        const user = await User.findOne({ where: { id } });
        const meta = await UserParameters.findOne({ where: { user_id: user?.dataValues?.id } });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ success: true, user: {...user?.dataValues, meta}});
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

export default getUserController;
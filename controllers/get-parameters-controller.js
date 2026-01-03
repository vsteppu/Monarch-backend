// controllers/login-controller.js
import UserParameters from "../models/UserParameters.js";

const getParametersController = async (req, res) => {
    const { id } = req.query;
    try {
        const meta = await UserParameters.findOne({ where: { user_id: id } });

        if (!meta) {
            res.status(404).json({ message: 'Parameters not found' });
        }

        res.status(200).json({ success: true, meta});
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

export default getParametersController;
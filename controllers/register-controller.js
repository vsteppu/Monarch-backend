// controllers/login-controller.js
import User from "../models/User.js";
import UserParameters from "../models/UserParameters.js";
import bcrypt from "bcrypt";

const registerController = async(req, res) => {
    const { name, email, password } = req.body;

    try {
        const isUserCreated = await User.findOne({ where: { email } });

        if (isUserCreated) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const hash = await bcrypt.hash(password, 10);
        
        await User.create({ name, email, password: hash });
        const createdUser = await User.findOne({ where: { email } });
        const userId = createdUser?.dataValues?.id

        await UserParameters.create({ user_id: userId });
        const meta = await UserParameters.findOne({where: { user_id: userId }});

        return res.status(201).json({ 
                user: { ...createdUser, meta: meta },
                success: true,
                message: 'New User was successfully created!'
            }
        )
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export default registerController;
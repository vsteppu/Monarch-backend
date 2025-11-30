// controllers/login-controller.js
import User from "../models/User.js";
import bcrypt from "bcrypt";

const loginController = async(credetials) => {
    const { name, email, password } = credetials;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });
        
        const hash = await bcrypt.hash(password, 10);

        const newUser = await User.create({ 
            name,
            email,
            password: hash,
        });
        
        return newUser
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export default loginController;
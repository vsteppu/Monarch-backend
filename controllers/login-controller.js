// controllers/login-controller.js
import User from "../models/User.js";
import bcrypt from "bcrypt";

const loginController = async(credetials) => {
    const { email, password } = credetials;

    try {
        const existingUser = await User.findOne({ where: { email } });

        if (!existingUser) {
            res.status(404).json({ success: false, message: "User Not found" });
            return;
        }
        const storedPasword = existingUser?.dataValues?.password;

        const passwordPassed = await bcrypt.compare(password, storedPasword);
        if (!passwordPassed) {
            res.status(401).json({ success: false, message: "Invalid password" })
            return;
        };
        
        return existingUser
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export default loginController;
// controllers/login-controller.js
import bcrypt from "bcryptjs";

import { authenticateUser } from "../models/User.js";

const loginController = async (c) => {
    const { email,  password } = await c.req.json();

    try {
        const user = await authenticateUser(c.env.MONARCH_DB, email);

        if (!user) {
            c.status(404);
            return c.json({
                message: 'User not found',
                success: false
            });
        }
        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
            c.status(401);
            return c.json({
                message: 'Invalid password',
                success: false
            });
        } else {
            c.status(200);
            return c.json({
                message: 'Login successful',
                success: true,
                user,
            });
        }

    } catch (err) {
        c.status(500);
        return c.json({
            success: false,
            message: 'Server error'
        });
    }
};

export default loginController;
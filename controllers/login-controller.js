// controllers/login-controller.js
import bcrypt from "bcryptjs";

import { authenticateUser } from "../models/User.js";
import { setJWT } from "../middleware/jwt-token.js";

const loginController = async (c) => {
    const { email,  password } = await c.req.json();

    try {
        const user = await authenticateUser(email);

        if (!user) {
            c.status(404);
            return c.json({
                message: 'User not found',
                success: false
            });
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            c.status(401);
            return c.json({
                message: 'Invalid password',
                success: false
            });
        } else {
            const token = await setJWT(c);

            c.status(200);
            return c.json({
                message: 'Login successful',
                success: true,
                user,
                token,
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
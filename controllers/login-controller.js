// controllers/login-controller.js
import bcrypt from "bcryptjs";
import { authenticateUser } from "../models/User.js";

const loginController = async (c) => {
    const env = c.env;
    const { email, password } = await c.req.json();

    try {
        const hash = bcrypt.hashSync(password, 10);
        const user = { email, password: hash };
        const existedUser = await authenticateUser(env.MONARCH_DB, user);

        if (!existedUser) {
            c.status(404);
            return c.json({ message: 'User not found' });
        }

        c.status(200);
        return c.json({
            user: existedUser,
            success: true,
            message: 'User logged in successfully!',
            status: 200
        });
    } catch (err) {
        c.status(500);
        return c.json({ success: false, message: 'Server error' });
    }
}

export default loginController
// controllers/login-controller.js
import bcrypt from "bcryptjs";
import { initUsersTable, createUser } from "../models/User.js";

const registerController = async (c) => {
    const { name, email, password } = await c.req.json();
    
    try {
        await initUsersTable(c.env.MONARCH_DB);

        const hash = bcrypt.hashSync(password, 10);

        const registerUser = { name, email, password: hash };

        const createdUser = await createUser(c.env.MONARCH_DB, registerUser);

        if (!createdUser) {
            return c.json({
                message: 'User already exists',
                success: false
            });
        }
        c.status(201);
        return c.json({
            message: 'New User was successfully created!',
            success: true,
            user: createdUser,
        });
    } catch (err) {
        c.status(500);
        return c.json({
            message: 'Server error',
            success: false
        });
    }
};

export default registerController;
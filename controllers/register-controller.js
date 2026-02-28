// controllers/register-controller.js
import bcrypt from "bcryptjs";
import { initUsersTable, createUser } from "../models/User.js";

const registerController = async (c) => {
    const { name, email, password } = await c.req.json();
    
    try {
        await initUsersTable();

        const hash = bcrypt.hashSync(password, 10);

        const credentials = { name, email, password: hash };

        const newUser = await createUser(credentials);

        if (!newUser) {
            return c.json({
                message: 'User already exists',
                success: false
            });
        } else {
            c.status(201);
            return c.json({
                message: 'New User was successfully created!',
                success: true,
                user: newUser,
            });
        }
    } catch (err) {
        c.status(500);
        return c.json({
            message: 'Server error',
            success: false
        });
    }
};

export default registerController;
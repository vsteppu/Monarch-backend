// controllers/login-controller.js
import bcrypt from "bcryptjs";
import { initUsersTable, createUser } from "../models/User.js";

const registerController = async (c) => {
    const env = c.env;
    const { name, email, password } = await c.req.json();
    
    try {
        await initUsersTable(env.monarch_db);

        // bcryptjs: use synchronous or async API; using sync for simplicity here
        const hash = bcrypt.hashSync(password, 10);
        console.log('hash: ', hash);

        const registerUser = { name, email, password: hash };
        console.log('registerUser: ', registerUser);

        const createdUser = await createUser(env.monarch_db, registerUser);
        console.log('createdUser: ', createdUser);

        if (!createdUser) {
            return c.json({ message: 'User already exists' });
        }
        c.status(201);
        return c.json({
            user: createdUser,
            success: true,
            message: 'New User was successfully created!',
            status: 201
        });
    } catch (err) {
        c.status(500);
        return c.json({ success: false, message: 'Server error' });
    }
};

export default registerController;
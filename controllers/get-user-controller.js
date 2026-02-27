// controllers/get-user-controller.js
import { getUserById } from "../models/User.js";

const getUserController = async (c) => {
    const id = c.req.param('id');

    try {
        const response = await getUserById(c.env.MONARCH_DB, id);

        if (!response) {
            return c.json({message: "User not found"})
        } else {
            return c.json(response)
        }
    } catch (err) {
        console.error(err);
        return c.json({ success: false, message: "Server errors" });
    }
}

export default getUserController;
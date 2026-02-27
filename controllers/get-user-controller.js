// controllers/login-controller.js
import { getUserById } from "../models/User.js";

const deleteController = async (c) => {
    const id = c.req.param('id');

    try {
        const response = await getUserById(c.env.MONARCH_DB, id);

        if (!response) {
            return c.json({success: true, message: "User was succesfully deleted"})
        } else {
            return c.json({success: false, message: "User wasn't deleted"})
        }
    } catch (err) {
        console.error(err);
        return c.json({ success: false, message: "Server errors" });
    }
}

export default deleteController;
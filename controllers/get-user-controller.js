// controllers/get-user-controller.js
import { getUserById } from "../models/User.js";
import { getJWT } from "../middleware/jwt-token.js";

const getUserController = async (c) => {
    const id = c.req.param('id');

    try {
        const response = await getUserById(c.env.MONARCH_DB, id);

        if (!response) {
            c.status(404);
            return c.json({message: "User not found"})
        };

        const jwtPass = getJWT(c);

        if (!jwtPass) {
            c.status(401);
            return c.json({ message: "Unauthorized to get user" })
        } else {
            return c.json(response)
        }
    } catch (err) {
        console.error(err);
        return c.json({ success: false, message: "Server errors" });
    }
}

export default getUserController;
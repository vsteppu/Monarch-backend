// routes/login.js
import express from "express";
import loginController from "../controllers/login-controller.js"
import authTokenValidation from "../middleware/auth-token-validation.js"
import { setJWT } from "../utils/jwt-token.js"

const router = express.Router();

router.post("/profile", async (req, res) => {
    const { email, password, token } = req.body;

    try {
        const existingUser = await loginController({ email, password })
        const tokenValidated = await authTokenValidation(token)


        if (!tokenValidated.success) {
            return res.status(403).json({
                success: false,
                message: "Turnstile validation failed",
            });
        }

        const successfulLogin = existingUser && tokenValidated.success;

        if (successfulLogin) {
            res.status(200).json({ 
                success: true, 
                user: existingUser,
                meta: {},
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;

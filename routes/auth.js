// routes/login.js
import express from "express";
import loginController from "../controllers/login-controller.js"
import authTokenValidation from "../middleware/auth-token-validation.js"
import { setJWT } from "../utils/jwt-token.js"

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hash = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, email, password: hash });
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post("/login", async (req, res) => {
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

router.post('/user', async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            res.status(200).json(existingUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;

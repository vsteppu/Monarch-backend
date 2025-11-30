import express from "express";
//import fetch from 'node-fetch'

const router = express.Router();
const secret = process.env.TURNSTILE_SECRET_KEY;

router.post("/token-validation", async (req, res) => {
    try {
        if (!token) {
            return res
                .status(400)
                .json({ success: false, message: "No token provided" });
        }
        const token = req.body.token;

        const result = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `secret=${secret}&response=${token}`,
            }
        );

        const data = await result.json();

        if (!data.success) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Turnstile validation failed",
                });
        }

        res.json({ success: true });
    } catch (error) {
        console.error("Turnstile error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

export default router;

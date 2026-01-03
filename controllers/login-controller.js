// controllers/login-controller.js
import User from "../models/User.js";
import UserParameters from "../models/UserParameters.js";
import authTokenValidation from "../middleware/auth-token-validation.js"
import bcrypt from "bcrypt";

const loginController = async (req, res) => {
    const { email, password, token } = req.body;
    //let email = "vurado@gmail.com"
    //let password = "123456Aa."

    try {
        const user = await User.findOne({ where: { email } });

        const userId = user?.dataValues?.id
        const storedPasword = user?.dataValues?.password;
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not found" });
        }

        const passwordPassed = await bcrypt.compare(password, storedPasword);
        const tokenValidated = await authTokenValidation(token)
        const meta = await UserParameters.findOne({ where: { user_id: userId } });

        if (!tokenValidated.success) {
            return res.status(403).json({ success: false, message: "Turnstile validation failed" });
        }

        if (!passwordPassed) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        };
        
        if (user && passwordPassed && tokenValidated.success) {
            return res.status(200).json({
                success: true,
                user
                })
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server errors" });
    }
}

export default loginController
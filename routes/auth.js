// routes/login.js
import express from "express";
import loginController from "../controllers/login-controller.js"
import registerController from "../controllers/register-controller.js"
import User from "../models/User.js";
import getUserController from "../controllers/get-user-controller.js";

const router = express.Router();

router.post('/register', registerController);
router.post(`/login`, loginController);

router.get('/user', getUserController);

export default router;

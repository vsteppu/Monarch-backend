// routes/login.js
import express from "express";
import loginController from "../controllers/login-controller.js";
import registerController from "../controllers/register-controller.js";
import getUserController from "../controllers/get-user-controller.js";
import getParametersController from "../controllers/get-parameters-controller.js";


const router = express.Router();

router.get(`/user`, getUserController);
router.get(`/parameters`, getParametersController);

router.post(`/register`, registerController);
router.post(`/login`, loginController);

export default router;

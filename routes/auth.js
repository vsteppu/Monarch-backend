import { Hono } from "hono";

import registerController from '../controllers/register-controller.js'
import loginController from '../controllers/login-controller.js'
import getUserController from '../controllers/get-user-controller.js'
import deleteController from '../controllers/delete-controller.js'

const router = new Hono();

router.post(`/register`, registerController);
router.post(`/login`, loginController);
router.get(`/get-user/:id`, getUserController);
router.delete(`/delete/:id`, deleteController);

export default router;
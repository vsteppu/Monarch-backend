import { Hono } from "hono";

import registerController from '../controllers/register-controller.js'
import loginController from '../controllers/login-controller.js'
import getUserController from '../controllers/get-user-controller.js'
import deleteController from '../controllers/delete-controller.js'

const router = new Hono();

router.post(`/register-user`, registerController);
router.post(`/login-user`, loginController);
router.post(`/get-user`, getUserController);
router.delete(`/delete-user/:id`, deleteController);

export default router;
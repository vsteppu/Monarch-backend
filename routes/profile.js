// routes/login.js
import express from "express";
import getUsersController from "../controllers/get-user-controller.js"

const router = express.Router();

router.get("/profile/:id", getUsersController);

export default router;

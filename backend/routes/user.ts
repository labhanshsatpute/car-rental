import express, { Router } from "express";
import AuthController from "../controllers/user/authController";

const router: Router = express.Router();

router.post('/register', AuthController.RegisterUser);

export default router;
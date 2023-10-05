import express, { Router } from "express";
import AuthController from "../controllers/user/authController";
import Auth from "../middlewares/Auth";

const router: Router = express.Router();

router.post('/register', AuthController.handleRegisterUser);
router.post('/login', AuthController.handleLoginUser);
router.get('/', Auth.authorizeUser, AuthController.handleGetAuthUser);

export default router;
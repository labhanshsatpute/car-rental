import express, { Router } from "express";
import AuthController from "../controllers/user/authController";
import Auth from "../middlewares/auth";
import UserController from "../controllers/user/userController";


const router: Router = express.Router();

router.post('/register', AuthController.handleRegisterUser);
router.post('/login', AuthController.handleLoginUser);
router.post('/login/google', AuthController.handleLoginWithGoogle);

router.get('/', Auth.authorizeUser, UserController.handleGetAuthUser);
router.patch('/', Auth.authorizeUser, UserController.handleUpdateUserInfo);

export default router;
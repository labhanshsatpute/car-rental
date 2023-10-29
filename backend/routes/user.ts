import express, { Router } from "express";
import AuthController from "../controllers/user/authController";
import Auth from "../middlewares/Auth";
import UserController from "../controllers/user/UserController";


const router: Router = express.Router();

router.post('/register', AuthController.handleRegisterUser);
router.post('/login', AuthController.handleLoginUser);

router.get('/', Auth.authorizeUser, UserController.handleGetAuthUser);
router.patch('/', Auth.authorizeUser, UserController.handleUpdateUserInfo);

export default router;
import express, { Router } from "express";
import AuthController from "../controllers/user/AuthController";
import Auth from "../middlewares/Auth";
import UserController from "../controllers/user/UserController";
import { upload } from "../config/storage";


const router: Router = express.Router();

router.post('/register', AuthController.handleRegisterUser);
router.post('/login', AuthController.handleLoginUser);
router.post('/login/google', AuthController.handleLoginWithGoogle);

router.get('/', Auth.authorizeUser, UserController.handleGetAuthUser);
router.patch('/', Auth.authorizeUser, UserController.handleUpdateUserInfo);
router.post('/password/update', Auth.authorizeUser, UserController.handleUpdateUserPassword);
router.get('/logged-in/devices', Auth.authorizeUser, UserController.handleGetLoggedInDevices);
router.put('/profile-image', Auth.authorizeUser, upload.single('profileImage'), UserController.handleUpdateProfileImage);

export default router;
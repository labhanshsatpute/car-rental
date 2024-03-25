import express, { Router } from 'express';
import AuthController from '../controllers/admin/AuthController';
import Auth from '../middlewares/Auth';
import UserController from '../controllers/admin/UserController';

const router: Router = express.Router();

router.post('/register', AuthController.handleRegisterAdmin);
router.post('/login', AuthController.handleLogin);
router.post('/send-password-reset-otp', AuthController.handleSendPasswordResetOtp);
router.post('/rest-password', AuthController.handleResetPassword);

router.get('/', Auth.authorizeAdmin, AuthController.handleAuthorizedAdmin);
router.get('/user', Auth.authorizeAdmin, UserController.handleGetUser);

export default router;
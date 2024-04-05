import express, { Router } from 'express';
import AuthController from '../controllers/admin/AuthController';
import Auth from '../middlewares/Auth';
import UserController from '../controllers/admin/UserController';
import BrandController from '../controllers/admin/BrandController';
import { upload } from '../config/storage';

const router: Router = express.Router();

router.post('/register', AuthController.handleRegisterAdmin);
router.post('/login', AuthController.handleLogin);
router.post('/send-password-reset-otp', AuthController.handleSendPasswordResetOtp);
router.post('/rest-password', AuthController.handleResetPassword);

router.get('/', Auth.authorizeAdmin, AuthController.handleAuthorizedAdmin);
router.get('/user', Auth.authorizeAdmin, UserController.handleGetUser);

router.get('/brand', Auth.authorizeAdmin, BrandController.handleGetBrand);
router.get('/brand/:id', Auth.authorizeAdmin, BrandController.handleGetIndividualBrand);
router.post('/brand', Auth.authorizeAdmin, upload.single('logo'), BrandController.handleCreateBrand);
router.put('/brand/:id', Auth.authorizeAdmin, upload.single('logo'), BrandController.handleUpdateBrand);

export default router;
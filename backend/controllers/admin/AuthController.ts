import { Request, Response } from 'express';
import joi from 'joi';
import Admin from '../../models/Admin';
import bcrypt from 'bcrypt';
import useragent from 'useragent';
import AdminAccessToken from '../../models/AdminAccessToken';
import VerificationOtp from '../../models/VerificationOtp';
import { sendPasswordResetMail } from '../../config/mail';

class AuthController {

    static async handleRegisterAdmin(req: Request, res: Response): Promise<Response> {
        try {

            const data = joi.object({
                name: joi.string().required().min(5).max(250).label('Name'),
                email: joi.string().email().required().min(10).max(250).label('Email'),
                phone: joi.string().required().min(10).max(10).label('Phone'),
                gender: joi.string().required().label('Gender'),
                password: joi.string().required().min(6).max(20).label('Password'),
            });

            const { error } = data.validate(req.body);
            if (error) {
                return res.status(200).send({
                    status: false,
                    message: error.details[0].message,
                    data: error.details
                });
            }
            
            const isEmailExists = await Admin.findOne({ email: req.body.email });
            if (isEmailExists) {
                return res.status(200).send({
                    status: false,
                    message: "Email already in exists",
                    data: null
                });   
            }

            const isPhoneExists = await Admin.findOne({ phone: req.body.phone });
            if (isPhoneExists) {
                return res.status(200).send({
                    status: false,
                    message: "Phone already in exists",
                    data: null
                });   
            }

            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const admin = await new Admin({ ...req.body, password: hashedPassword }).save();
            const token = await admin.generateAuthToken(admin._id);

            const userAgentString = req.headers['user-agent'];
            const agent = useragent.parse(userAgentString);

            await new AdminAccessToken({ 
                adminId: admin._id, 
                token: token, 
                operatingSystem: agent.os.family, 
                ipAddress: req.ip 
            }).save();

            return res.status(201).send({
                status: true,
                message: "Admin successfully registred",
                data: {
                    'admin': admin,
                    'accessToken': token
                }
            });

        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Internal server error",
                error: error
            });
        }
    }

    static async handleLogin(req: Request, res: Response): Promise<Response> {
        try {
            
            const data = joi.object({
                email: joi.string().email().required().min(10).max(250).label('Email'),
                password: joi.string().required().min(6).max(20).label('Password'),
            });

            const { error } = data.validate(req.body);
            if (error) {
                return res.status(200).send({
                    status: false,
                    message: error.details[0].message,
                    data: error.details
                });
            }

            const admin = await Admin.findOne({ email: req.body.email });
            if (!admin) {
                return res.status(200).send({
                    status: false,
                    message: "Email does not exists",
                    data: null
                });   
            }
            
            const verifyPassword = await bcrypt.compare(req.body.password, admin.password);
            if (!verifyPassword) {
                return res.status(200).send({
                    status: false,
                    message: "Invalid password",
                    data: null
                });
            }

            const token = await admin.generateAuthToken(admin._id);

            const userAgentString = req.headers['user-agent'];
            const agent = useragent.parse(userAgentString);

            await new AdminAccessToken({ 
                adminId: admin._id, 
                token: token, 
                operatingSystem: agent.os.family, 
                ipAddress: req.ip 
            }).save();

            return res.status(200).send({
                status: true,
                message: "Admin successfully logged in",
                data: {
                    'admin': admin,
                    'accessToken': token
                }
            });

        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Internal server error",
                error: error
            });
        }
    }

    static async handleSendPasswordResetOtp(req: Request, res: Response): Promise<Response> {
        try {
            
            const data = joi.object({
                email: joi.string().email().required().min(10).max(250).label('Email'),
            });

            const { error } = data.validate(req.body);
            if (error) {
                return res.status(200).send({
                    status: false,
                    message: error.details[0].message,
                    data: error.details
                });
            }

            const admin = await Admin.findOne({ email: req.body.email });
            if (!admin) {
                return res.status(200).send({
                    status: false,
                    message: "Email does not exists",
                    data: null
                });   
            }

            const otp = Math.floor(Math.random()*899999+100000);

            await new VerificationOtp({
                email: admin.email,
                entityType: "ADMIN",
                entityId: admin._id,
                purpose: "FORGOT_PASSWORD",
                otp: otp
            }).save();

            sendPasswordResetMail(admin.email, otp.toString());

            return res.status(200).send({
                status: true,
                message: "OTP successfully sent to your email",
                data: null
            });

        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Internal server error",
                error: error
            });
        }
    }

    static async handleResetPassword(req: Request, res: Response): Promise<Response> {
        try {
            
            const data = joi.object({
                otp: joi.string().required().min(6).max(6).label('OTP'),
                email: joi.string().email().required().min(10).max(250).label('Email'),
                password: joi.string().required().min(6).max(20).label('Password'),
            });

            const { error } = data.validate(req.body);
            if (error) {
                return res.status(200).send({
                    status: false,
                    message: error.details[0].message,
                    data: error.details
                });
            }

            const admin = await Admin.findOne({ email: req.body.email });
            if (!admin) {
                return res.status(200).send({
                    status: false,
                    message: "Email does not exists",
                    data: null
                });   
            }

            const validateOtp = await VerificationOtp.findOne({
                entityType: "ADMIN",
                otp: req.body.otp,
                email: req.body.email
            });

            if (!validateOtp) {
                return res.status(200).send({
                    status: false,
                    message: "Invalid OTP",
                    data: null
                });   
            }

            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            await Admin.findOneAndUpdate({
                _id: admin._id
            }, {
                password: hashedPassword,
                passwordUpdatedAt: Date()
            });

            await VerificationOtp.findOneAndDelete({
                entityType: "ADMIN",
                email: req.body.email
            }).deleteMany();

            return res.status(200).send({
                status: true,
                message: "Password successfully set",
                data: null
            });

        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Internal server error",
                error: error
            });
        }
    }

    static async handleAuthorizedAdmin(req: Request, res: Response) {
        try {

            return res.status(200).send({
                status: true,
                message: "Admin successfully fetched",
                data: (req as any).admin,
            });
        
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Internal server error",
                error: error
            });
        }
    }

}

export default AuthController;
import { Request, Response } from "express";
import joi from 'joi';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import UserAccessToken from '../../models/UserAccessToken';
import useragent from 'useragent';

class AuthController {
    
    
    static async handleRegisterUser(req: Request, res: Response): Promise<Response> {

        try {

            const data = joi.object({
                name: joi.string().required().min(5).max(250).label('Name'),
                email: joi.string().email().required().min(10).max(250).label('Email'),
                password: joi.string().required().min(6).max(20).label('Password'),
            });

            const { error } = data.validate(req.body);

            if (error) {
                return res.status(400).send({
                    status: false,
                    message: error.details[0].message,
                    data: error.details
                });
            }

            const isEmailExists = await User.findOne({ email: req.body.email });
            if (isEmailExists) {
                return res.status(400).send({
                    status: false,
                    message: "Email already in exists",
                    data: null
                });   
            }
            
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            const user = await new User({ ...req.body, password: hashPassword }).save();
            const token = user.generateAuthToken(user._id);

            const userAgentString = req.headers['user-agent'];
            const agent = useragent.parse(userAgentString);

            await new UserAccessToken({ 
                userId: user._id, 
                token: token, 
                operatingSystem: agent.os.family, 
                ipAddress: req.ip 
            }).save();
            
            return res.status(201).send({
                status: true,
                message: "User successfully registred",
                data: {
                    'user': user,
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

    static async handleLoginUser(req: Request, res: Response) {
        try {

            const data = joi.object({
                email: joi.string().email().required().min(10).max(250).label('Email'),
                password: joi.string().required().min(6).max(20).label('Password'),
            });

            const { error } = data.validate(req.body);
            if (error) {
                return res.status(400).send({
                    status: false,
                    message: error.details[0].message,
                    data: error.details
                });
            }

            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).send({
                    status: false,
                    message: "Email does not exists",
                    data: null
                });
            }

            const verifyPassword = await bcrypt.compare(req.body.password, user.password);
            if (!verifyPassword) {
                return res.status(400).send({
                    status: false,
                    message: "Invalid password",
                    data: null
                });
            }

            const token = user.generateAuthToken(user._id);

            const userAgentString = req.headers['user-agent'];
            const agent = useragent.parse(userAgentString);

            await new UserAccessToken({ 
                userId: user._id, 
                token: token, 
                operatingSystem: agent.os.family, 
                ipAddress: req.ip 
            }).save();

            return res.status(200).send({
                status: true,
                message: "User successfully loggedin",
                data: {
                    'user': user,
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

    static async handleGetAuthUser(req: Request, res: Response) {
        try {

            return res.status(200).send({
                status: true,
                message: "User successfully fetched",
                data: (req as any).user,
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
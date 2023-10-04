import { Request, Response } from "express";
import joi from 'joi';
import User from '../../models/user';
import bcrypt from 'bcrypt';

class AuthController {
    
    
    static async RegisterUser(req: Request, res: Response): Promise<Response> {

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
            
            return res.status(201).send({
                status: true,
                message: "User successfully registred",
                data: {
                    'user': user,
                    'token': token
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
}

export default AuthController;
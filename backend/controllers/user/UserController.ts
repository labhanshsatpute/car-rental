import { Request, Response } from 'express';
import joi from 'joi';
import User from '../../models/User';
import Controller from '../Controller';

class UserController extends Controller {

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

    static async handleUpdateUserInfo(req: Request, res: Response) {

        try {

            const data = joi.object({
                name: joi.string().required().min(5).max(250).label('Name'),
                email: joi.string().email().required().min(10).max(250).label('Email'),
                phone: joi.string().required().min(10).max(12).label('Phone'),
                gender: joi.string().min(4).max(6).label('Gender')
            });

            const { error } = data.validate(req.body);

            if (error) {
                res.status(400).send({
                    status: false,
                    messsage: error.details[0].message,
                    data: error.details
                });
            }

            const emailExists = await User.findOne({ 
                email: req.body.email, _id: { $ne: (req as any).user._id } 
            });

            if (emailExists) {
                res.status(400).send({
                    status: false,
                    messsage: "Email already in use",
                    data: null
                });
            }
            const phoneExists = await User.findOne({ 
                phone: req.body.phone, _id: { $ne: (req as any).user._id } 
            });

            if (phoneExists) {
                res.status(400).send({
                    status: false,
                    messsage: "Phone already in use",
                    data: null
                });
            }

            const user = await User.findByIdAndUpdate((req as any).user._id, {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                gender: req.body.gender
            }, { new: true });

            return res.status(200).send({
                status: true,
                messsage: "Changes successfully saved",
                data: user
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

export default UserController;
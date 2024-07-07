import { Request, Response } from 'express';
import joi from 'joi';
import User from '../../models/User';
import Controller from '../Controller';
import bcrypt from 'bcrypt';
import UserAccessToken from '../../models/UserAccessToken';

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

    static async handleGetLoggedInDevices(req: Request, res: Response) {
        try {

            const devices: any = await UserAccessToken.find({ userId: (req as any).user._id }).select({ ipAddress: 1, operatingSystem: 1, createdAt: 1, token: 1 }).sort({ createdAt: 'desc' });

            return res.status(200).send({
                status: true,
                message: "Logged in devices successfully fetched",
                data: devices,
            });
        
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Internal server error",
                error: error
            });
        }
    }

    static async handleDeleteLoggedInDevice(req: Request, res: Response) {
        try {

            const id = req.params.id;

            await UserAccessToken.findOneAndDelete({ _id: id }).deleteOne()

            return res.status(200).send({
                status: true,
                message: "Successfully logged out",
                data: null,
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
                name: joi.string().min(5).max(250).label('Name'),
                email: joi.string().email().min(10).max(250).label('Email'),
                phone: joi.string().min(10).max(12).label('Phone'),
                gender: joi.string().min(4).max(6).label('Gender'),
                password: joi.string().min(6).max(20).required().label('Password')
            });

            const { error } = data.validate(req.body);

            if (error) {
                res.status(400).send({
                    status: false,
                    messsage: error.details[0].message,
                    data: error.details
                });
            }

            const authUser: any = await User.findById((req as any).user._id);
            
            const verifyPassword = await bcrypt.compare(req.body.password, authUser.password);
            if (!verifyPassword) {
                return res.status(200).send({
                    status: false,
                    message: "Invalid password",
                    data: null
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

            delete req.body.password;
            
            const user = await User.findByIdAndUpdate((req as any).user._id, { ...req.body }, { new: true });

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

    static async handleUpdateUserPassword(req: Request, res: Response) {

        try {
        
            const data = joi.object({
                currentPassword: joi.string().min(6).max(20).required().label('Current Password'),
                newPassword: joi.string().min(6).max(20).required().label('New Password')
            });

            const { error } = data.validate(req.body);

            if (error) {
                res.status(400).send({
                    status: false,
                    messsage: error.details[0].message,
                    data: error.details
                });
            }

            const authUser: any = await User.findById((req as any).user._id);
            
            const verifyPassword = await bcrypt.compare(req.body.currentPassword, authUser.password);
            if (!verifyPassword) {
                return res.status(200).send({
                    status: false,
                    message: "Current password not matched",
                    data: null
                });
            }

            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

            await User.findByIdAndUpdate((req as any).user._id, {
                password: hashPassword,
            }, { new: true });

            return res.status(200).send({
                status: true,
                messsage: "Password successfully updated",
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

    static async handleUpdateProfileImage(req: Request, res: Response) {

        try {

            if (!(req as any).file) {
                res.status(400).send({
                    status: false,
                    messsage: "Please select a image to upload",
                    data: null
                });
            }
            
            const user = await User.findByIdAndUpdate((req as any).user._id, {
                profileImage: (req as any).file.path,
            }, { new: true });
            
            return res.status(200).send({
                status: true,
                messsage: "Profile image successfully updated",
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
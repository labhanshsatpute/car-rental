import { Request, Response } from 'express';
import joi from 'joi';
import User from '../../models/User';

class UserController {

    static async handleGetUser(req: Request, res: Response) {
        try {

            const users = await User.find({ deletedAt: null });

            return res.status(200).send({
                status: true,
                message: "Users successfully fetched",
                data: users
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
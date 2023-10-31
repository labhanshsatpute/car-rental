import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import UserAccessToken from '../models/UserAccessToken';

class Auth {

    static async authorizeUser(req: Request, res:Response, next: NextFunction) {
        try {

            const authHeader = req.headers.authorization;

            if (!authHeader) {
                throw "Please provice authorization token"
            }

            if (typeof authHeader != undefined) {
                
                const bearerToken = authHeader.split(' ')[1];

                const token = await UserAccessToken.findOne({ token: bearerToken });

                if (!token) {
                    throw "Invalid authorization token";
                }
                
                const user = await User.findOne({ _id: token.userId }).select('-password');

                (req as any).user = user;

                return next();
                
            }
            else {
                throw "Invalid authorization token";
            }
    
            
        } catch (error) {
            return res.status(400).send({
                status: false,
                message: error
            });    
        }
    }
}

export default Auth;

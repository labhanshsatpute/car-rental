import express, { Request, Response } from "express";
import dbConnection from "../config/database";
import cors from 'cors';
import userRouter from '../routes/user';
import adminRouter from '../routes/admin';
import guestRouter from '../routes/guest';

require("dotenv").config();

const port: number = parseInt(process.env.APP_PORT as string);

const app: any = express();

dbConnection();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use('/api', guestRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/storage', express.static('storage'));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from server');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
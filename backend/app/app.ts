import * as dotenv from 'dotenv';
import express from "express";
import dbConnection from "../config/database";
import cors from 'cors';
import userRouter from '../routes/user';

dotenv.config();

const port: number = 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

dbConnection();

app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send('Hello from server');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
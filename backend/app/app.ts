import * as dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import dbConnection from "../config/database";

dotenv.config({ path: __dirname + '/.env' });

const port: number = 8000;

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

dbConnection();

app.get('/', (req, res) => {
    res.send('Hello from server');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
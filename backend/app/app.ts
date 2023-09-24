import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const port: number = 8000;

const app: express.Application = express();

app.get('/', (req, res) => {
    res.send('Hello from server');
});

app.listen(port, () => {
    console.log("Server started on port 8000");
});
import mongoose from "mongoose";
import app from "./app";
import dotenv from 'dotenv';

dotenv.config();
const connect = process.env.CONNECTION_STRING!;
const port = process.env.PORT!;

mongoose.connect(connect)
    .then(() => {
        console.log("Connected to DB");
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        })
    })
    .catch((err) => {
        console.error("Error connecting to DB", err);
    })

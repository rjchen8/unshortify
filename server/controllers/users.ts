import { RequestHandler } from "express";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

export const logIn: RequestHandler = async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw new Error("Parameters missing!");
        }

        const user = await UserModel.findOne({ username: username }).select("+password");

        if (!user) {
            res.status(400).send("Invalid credentials");
            throw new Error("Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(400).send("Invalid credentials");
            throw new Error("Invalid credentials");
        }

        req.session.userId = user._id;
        res.status(201).json(user);
    }

    catch(error) {
        console.error(error)
    }
}

export const signUp: RequestHandler = async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw new Error("Parameters missing!");
        }
        
        const existingUsername = await UserModel.findOne({ username: username });

        if (existingUsername) {
            res.status(400).send("Username already taken!")
            throw new Error("Username already taken!");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            username: username,
            password: hashedPassword,
        })

        req.session.userId = newUser._id;
        res.status(201).json(newUser);
    }

    catch(error) {
        console.error(error);
    }
}

export const logOut: RequestHandler = async(req, res) => {
    await req.session.destroy(error => {
        if (error) {
            console.error(error);
        }
        
        else {
            res.status(200).send("Logged out successfully.")
        }
    })
}
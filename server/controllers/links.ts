import { RequestHandler } from "express";
import LinkModel from "../models/link";
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.token;

export const getLinks: RequestHandler = async (req, res) => {
    // Get all links from DB
    try {
        const links = await LinkModel.find({});
        res.status(200).json(links);
    }

    catch(error) {
        console.error(error);
    }
}

export const createLink: RequestHandler = async (req, res) => {
    // Call Unshorten API, write to DB
    try {

    }

    catch(error) {
        
    }
}
import { RequestHandler } from "express";
import LinkModel from "../models/link";
import dotenv from 'dotenv';
import axios, { Axios, AxiosResponse } from 'axios';

dotenv.config();
const unshortenToken = process.env.UNSHORTEN_TOKEN;
const previewToken = process.env.PREVIEW_TOKEN;

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

interface UnshortenResponse {
    unshortened_url: String,
    shortened_url: String,
    success: boolean,
}

interface PreviewResponse {
    title: String,
    description: String,
    image: String,
    url: String,
}

export const createLink: RequestHandler = async (req, res) => {
    // Call Unshorten API, call LinkPreview API, write results to DB
    try {
        // Extract shortened link from req and call Unshorten API
        const shortLink = req.body.shortLink;

        const unshortenResponse: AxiosResponse<UnshortenResponse> = await axios.get(`https://unshorten.me/api/v2/unshorten?url=${shortLink}`, {
            headers: {
                'Authorization': `Token ${unshortenToken}`
            }}
        )
        const longLink = unshortenResponse.data.unshortened_url;
        
        // Call LinkPreview API
        
        const previewResponse: AxiosResponse<PreviewResponse> = await axios.get(`https://api.linkpreview.net/?q=${longLink}`, {
            headers: {
                'X-Linkpreview-Api-Key': previewToken,
            }
        })

        const title = previewResponse.data.title;
        const description = previewResponse.data.description;
        const imageLink = previewResponse.data.image;
        
        const newLink = await LinkModel.create({
            shortLink: shortLink,
            longLink: longLink,
            title: title,
            description: description,
            imageLink: imageLink,
        })

        res.status(201).json(newLink);
    }

    catch(error) {
        console.error(error);
    }
}

export const deleteLink: RequestHandler = async (req, res) => {
    const linkId = req.params.id

    try {
        await LinkModel.findByIdAndDelete(linkId);
        res.status(200).send("Note deleted successfully.")
    }

    catch(error) {
        console.error(error);
    }
}
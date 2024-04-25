import { RequestHandler } from "express";

const requiresAuth: RequestHandler = (req, res, next) => {
    if (req.session.userId) {
        next();
    }

    else {
        res.status(401).send("Authorization needed")
    }
}

export default requiresAuth;
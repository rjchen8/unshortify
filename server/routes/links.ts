import express from "express";
import * as LinksController from "../controllers/links";

const router = express.Router();

router.get("/", LinksController.getLinks);

router.post("/", LinksController.createLink);

router.delete("/:id", LinksController.deleteLink);

export default router;
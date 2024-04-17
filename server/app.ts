import express from "express";
import linksRoutes from "./routes/links";

const app = express();

app.use(express.json());

app.use("/api/links", linksRoutes);

export default app;
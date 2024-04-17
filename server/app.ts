import express from "express";
import linksRoutes from "./routes/links";

const app = express();

app.use("/api/links", linksRoutes);

export default app;
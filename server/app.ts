import express from "express";
import cors from "cors";
import linksRoutes from "./routes/links";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/links", linksRoutes);

export default app;
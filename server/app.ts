import express from "express";
import cors from "cors";
import linksRoutes from "./routes/links";
import usersRoutes from "./routes/users";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import requiresAuth from "./middleware/requiresAuth";

dotenv.config();
const mongoUrl = process.env.CONNECTION_STRING;
const secret = process.env.AUTH_SECRET!;

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: mongoUrl
    })

}))

app.use("/api/users", usersRoutes);
app.use("/api/links", requiresAuth, linksRoutes);

export default app;
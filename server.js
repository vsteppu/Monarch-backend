import { env } from "cloudflare:workers";
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import authUser from "./routes/auth.js"
import dailyExercises from "./routes/daily-exercise.js"

dotenv.config();
const port = process.env.PORT || 9000;
const app = express();

export const apiPrefix = process.env.NODE_ENV !== 'production' 
    ? '/api'
    : ''

app.use(
    cors({
        origin: [
            "http://localhost:5000",
            "https://maincharacterapp.pages.dev",
            "https://maincharacters.org",
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
    })
);

app.use(cookieParser())
app.use(express.json());


app.get(`/user`, authUser);
app.get(`/parameters`, authUser);
app.post(`/login`, authUser);
app.post(`/register`, authUser);

app.get(`/get-exercises`, dailyExercises);
app.post(`/add-exercises`, dailyExercises);
app.delete(`/delete-exercise/:id`, dailyExercises);
app.delete(`/delete-all-exercises`, dailyExercises);

//app.post(`/token-validation`, tokenValidation);

app.listen(port, () => {
    console.log(`server listen to > http://localhost:${port}`);
});

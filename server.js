import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import authUser from "./routes/auth.js"
import dailyExercises from "./routes/daily-exercise.js"

dotenv.config();
const port = process.env.PORT || 9000;
const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5000",
            "https://maincharacterapp.pages.dev",
            "https://maincharacters.org",
            "https://monarch-backend-production-0a7c.up.railway.app/login"
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
    })
);

app.use(cookieParser())
app.use(express.json());


app.get("/user", authUser);
app.post("/login", authUser);
app.post("/register", authUser);

app.get("/get-exercises", dailyExercises);
app.post("/add-exercises", dailyExercises);
app.delete("/delete-exercise/:id", dailyExercises);
app.delete("/delete-all-exercises", dailyExercises);

//app.post("/profile", userProfile);
//app.post("/token-validation", tokenValidation);

//app.options('/login', cors());

app.listen(port);

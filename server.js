import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import sequelize from "./config/db.js"
import getUser from "./routes/user.js"
import registerUser from "./routes/register.js"
import authUser from "./routes/auth.js"
import userProfile from "./routes/profile.js"
import tokenValidation from "./routes/token-validation.js"
import dailyExercises from "./routes/daily-exercise.js"

dotenv.config();
const port = process.env.PORT || 9000;
const app = express();

app.use(
    cors({
        origin: "http://localhost:5000",
        credentials: true,
    })
);
app.use(cookieParser())
app.use(express.json());


app.post("/login", authUser);
app.post("/user", authUser);
app.post("/register", authUser);

app.get("/get-exercises", dailyExercises);
app.post("/add-exercises", dailyExercises);
app.delete("/delete-exercise/:id", dailyExercises);
app.delete("/delete-all-exercises", dailyExercises);

//app.post("/profile", userProfile);
//app.post("/token-validation", tokenValidation);

app.listen(port, () => {
    console.log(`♻️  Server run on http://localhost:${port}`);
});

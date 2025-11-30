// controllers/daily-exercise-controller.js
import DailyExercise from "../models/DailyExercise.js";
import User from "../models/User.js"

export const getExercises = async(req, res) => {
    try {
        const exercises = await DailyExercise.findAll();
        if (!exercises) {
            res.status(404).json({ success: false, message: "Exercises not found" });
            return;
        }

        return exercises
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const postExercises = async(data) => {
    console.log('data: ', data);
    const { user_id, exercises } = data
    try {
        const addDailyExercises = await DailyExercise.create({
            user_id,
            daily_exercise: exercises
        });
        
        if (!addDailyExercises) {
            res.status(404).json({ success: false, message: "Can't add new exercises" });
            return;
        }

        await addDailyExercises.save()
        return addDailyExercises
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteExercise = async(id) => {
    try {
        return await DailyExercise.destroy({ where: { id} });
    } catch (err) {
        throw err
    }
};

export const deleteAllExercises = async(id) => {
    try {
        return await DailyExercise.destroy({ truncate: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
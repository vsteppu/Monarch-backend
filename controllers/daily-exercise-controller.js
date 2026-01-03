// controllers/daily-exercise-controller.js
import DailyExercise from "../models/DailyExercise.js";
import User from "../models/User.js"

export const getExercises = async(req, res) => {
    const userId = req.query.id
    console.log('userId: ', userId);
    try {
        const exercises = await DailyExercise.findAll();
        const listById = exercises.filter(el => el.dataValues.user_id == userId)

        if (!exercises) {
            res.status(404).json({ success: false, message: "Exercises not found" });
            return;
        }
        return res.status(200).json({ 
            success: true,
            exercises: listById,
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error #1" });
    }
};

export const postExercises = async(req, res) => {
    const { user_id, exercises } = req.body
    console.log('exercises: ', exercises);
    console.log('user_id: ', user_id);
    try {
        const addDailyExercises = await DailyExercise.create({
            user_id,
            daily_exercise: exercises
        });
        
        if (!addDailyExercises) {
            res.status(404).json({ success: false, message: "Can't add new exercises" });
        } else {
            res.status(200).json({ success: true, exercises: addDailyExercises,})
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error #2" });
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
        res.status(500).json({ success: false, message: "Server error #3" });
    }
};
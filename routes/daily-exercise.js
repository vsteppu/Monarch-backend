import express from "express";
import { 
    getExercises,
    postExercises,
    deleteExercise,
    deleteAllExercises
} from '../controllers/daily-exercise-controller.js'

const router = express.Router();

router.get("/get-exercises", async(req, res) => {
    try{
        const response = await getExercises()
        res.status(200).json({ 
            success: true,
            exercises: response,
        })
    } catch (err) {
        res.status(400).json({ 
            success: false,
            message: err.message
        })

    }
})

router.post("/add-exercises", async(req, res) => {
    try{
        const response = await postExercises(req.body)
        res.status(200).json({ 
            success: true,
            exercises: response,
        })
    } catch (err) {
        res.status(400).json({ 
            success: false,
            message: err.message
        })

    }
})

router.delete("/delete-exercise/:id", async(req, res) => {
    const { id } = req.params
    try{
        const response = await deleteExercise(id)

        if (!response) {
            res.status(404).json({ success: false, message: "Deleting was unsuccessful" });
            return;
        } else {
            res.status(200).json({ 
                success: true,
                exercises: response,
            })
        }
    } catch (err) {
        res.status(400).json({ 
            success: false,
            message: err.message
        })
    }
})

router.delete("/delete-all-exercises", async(req, res) => {
    try{
        const response = await deleteAllExercises()

        if (!response) {
            res.status(404).json({ success: false, message: "Can't add new exercises" });
            return;
        } else {
            res.status(200).json({ 
                success: true,
                exercises: response,
            })
        }
    } catch (err) {
        res.status(400).json({ 
            success: false,
            message: err.message
        })

    }
})

export default router


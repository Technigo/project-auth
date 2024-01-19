import express from "express"
import { TaskModel } from "../models/taskModel.js"
/* import tasks from "../tasks.json" */

const router = express.Router();

/* const seedDatabase = async () => {
    await TaskModel.deleteMany({})

    tasks.tasks.forEach((task) => {
        new TaskModel(task).save()
    })
}

seedDatabase() */

router.get("/get", async (req, res) => {
    await TaskModel.find()
        .then((result) => res.json(result))
        .catch((error) => res.json(error))
})

router.post("/add", async (req, res) => {
    const task = req.body.task;
    await TaskModel.create({ task: task })
        .then((result) => res.json(result))
        .catch((error) => res.json(error))
})

router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    await TaskModel.findByIdAndUpdate({ _id: id }, { done: true })
        .then((result) => res.json(result))
        .catch((error) => res.json(error))
})

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    await TaskModel.findByIdAndDelete(id)
        .then((result) => {
            if (result) {
                res.json({
                    message: "Task deleted successfully",
                    deleteTask: result
                })
            } else {
                res.status(404).json({ message: "Task not found" })
            }
        })
        .catch((err) => res.status(500).json(err))
});

router.delete("/deleteAll", async (req, res) => {
    await TaskModel.deleteMany({})
        .then((result) => {
            res.json({
                message: "All tasks deleted",
                deletedCount: result.deletedCount
            })
        })
        .catch((err) => res.status(500).json(err))
})

export default router
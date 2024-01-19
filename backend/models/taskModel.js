import mongoose from "mongoose";

const { Schema } = mongoose;

export const taskSchema = new Schema ({
    task: {
        type: String,
        required: true,
        minLength: 5
    },
    done: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const TaskModel = mongoose.model('tasks', taskSchema)
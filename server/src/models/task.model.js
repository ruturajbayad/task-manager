import mongoose, {Schema} from "mongoose";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            enum: ["todo", "inprogress", "done"],
            default: "todo"
        }
    },
    {
        timestamps: true
    }
)

export const Task = mongoose.model("Task", taskSchema)
import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  dueDate: {
    type: Date,
    required: [true, "Please provide a due date"],
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    // required: [true, "Please provide a priority level"],
  },
  status: {
    type: String,
    enum: ["todo", "progress", "completed"],
    // required: [true, "Please provide a status"],
  },
  // status_name: {
  //   type: String,
  //   enum: ["ok", "done", "finish"],
  //   required: [true, "Please provide a status name"],
  // },
  category: {
    type: String,
    required: [true, "Please provide a category"],
  },
  user: {
    type: String,
  },
});

const Task = models.Task || model("Task", taskSchema);

export default Task;

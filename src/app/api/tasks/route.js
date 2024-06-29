import { connect } from "@/db/db";
import Task from "@/models/taskModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  connect();
  try {
    const reqBody = await request.json();
    console.log("Received task data:", reqBody); // Debugging log

    const { title, description, dueDate, status, priority, category, user } =
      reqBody;

    const existingTask = await Task.findOne({ title });
    if (existingTask) {
      return NextResponse.json({
        message: "Already added this task",
        existingTask,
      });
    }

    const newTaskData = new Task({
      title,
      description,
      dueDate,
      status,
      priority,
      category,
      user,
    });

    const saveTask = await newTaskData.save();

    return NextResponse.json({
      message: "Task added successfully",
      success: true,
      saveTask,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

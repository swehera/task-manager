import { connect } from "@/db/db";
import Task from "@/models/taskModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Connect to the database
connect();

// Adding a task
export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { title, description, dueDate, status, priority, category } = reqBody;

    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "No token provided", success: false },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const existingTask = await Task.findOne({ title, user: userId });
    if (existingTask) {
      return NextResponse.json({
        message: "Already added this task",
        success: false,
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
      user: userId,
    });

    const saveTask = await newTaskData.save();

    return NextResponse.json({
      message: "Task added successfully",
      success: true,
      saveTask,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
};

// Fetching tasks for the logged-in user
export const GET = async (request) => {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "No token provided", success: false },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Fetch tasks and log them to check for duplicates
    const tasks = await Task.find({ user: userId });
    console.log("Fetched Tasks:", tasks);
    return NextResponse.json({ success: true, tasks });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
};

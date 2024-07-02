// pages/api/tasks/[id].js
import { connect } from "@/db/db";
import Task from "@/models/taskModel";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  // Ensure the database connection is established
  await connect();

  // Get the id from the URL parameters
  const { id } = params;
  console.log("single task id", id);

  try {
    // Fetch the task from the database
    const task = await Task.findById(id);

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Single Task fetched successfully",
      task,
    });
  } catch (error) {
    console.error("Error fetching task:", error);

    return NextResponse.json(
      { message: "Error fetching task", error: error.message },
      { status: 500 }
    );
  }
};

// Update task API
export const PATCH = async (request, { params }) => {
  const { id } = params;

  try {
    const { title, description, dueDate, priority, status, category, user } =
      await request.json();
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, dueDate, priority, status, category, user },
      { new: true, runValidators: true }
    );

    // Check
    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Updated successfully",
      updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { message: "Error updating task", error: error.message },
      { status: 500 }
    );
  }
};

// Delete task API
export const DELETE = async (request, { params }) => {
  // Ensure the database connection is established
  await connect();

  // Get the id from the URL parameters
  const { id } = params;

  try {
    // Delete the task from the database
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Task deleted successfully",
      deletedTask,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { message: "Error deleting task", error: error.message },
      { status: 500 }
    );
  }
};

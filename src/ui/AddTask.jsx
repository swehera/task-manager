"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Category from "./Category";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { addAllTasks } from "@/redux/taskSlice";
import { API_BASE_URL } from "../../utils/apiConfig";

const AddTask = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const categoryData = useSelector((state) => state.category.category);
  const url = "http://localhost:3000"; // Replace with your production URL

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("todo");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryData.length > 0) {
      setSelectedCategory(categoryData[0]?.category_name || "");
    }
  }, [categoryData]);

  // const handleAddTask = async (e) => {
  //   e.preventDefault();

  //   if (!title || !description || !dueDate || !selectedCategory) {
  //     toast.error("Please fill all the fields");
  //     return;
  //   }

  //   const taskData = {
  //     title,
  //     description,
  //     dueDate,
  //     priority,
  //     status,
  //     category: selectedCategory,
  //   };

  //   console.log("Task Data to send:", taskData);

  //   try {
  //     setLoading(true);
  //     const response = await fetch(`${url}/api/tasks`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${userInfo.token}`,
  //       },
  //       body: JSON.stringify(taskData),
  //     });

  //     const data = await response.json();

  //     console.log("This is the tasks", data);

  //     if (data.success) {
  //       dispatch(addAllTasks([data.saveTask])); // Dispatch the new task as an array
  //       toast.success(data.message);

  //       setTitle("");
  //       setDescription("");
  //       setDueDate("");
  //       setPriority("low");
  //       setStatus("todo");
  //       setSelectedCategory(categoryData[0]?.category_name || "");
  //       router.push("/");
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error adding task:", error);
  //     toast.error("An error occurred while adding task");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleAddTask = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      dueDate,
      priority,
      status,
      category: selectedCategory,
    };

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();

      if (data.success) {
        dispatch(addAllTasks([data.saveTask])); // Dispatch the new task as an array
        toast.success(data.message);

        setTitle("");
        setDescription("");
        setDueDate("");
        setPriority("low");
        setStatus("todo");
        setSelectedCategory(categoryData[0]?.category_name || "");
        router.push("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("An error occurred while adding task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[80vh]">
      {loading ? (
        <div className="flex items-center justify-center">
          <p className="text-white text-xl font-semibold">Task Adding...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-2">
            <div>
              <p className="text-xl font-semibold text-white">
                Hola, {userInfo?.name}
              </p>
            </div>
            <div className="py-1 px-3 w-full rounded-md bg-white">
              <p className="text-sm font-semibold text-grayTextColor">
                Add Task
              </p>
            </div>
          </div>

          <div className="w-full block md:hidden">
            <p className="text-white mt-1">Add new category</p>
            <Category />
          </div>

          <div className="w-full px-4 py-4 bg-white rounded-md flex flex-col gap-y-2">
            <div className="w-full rounded-md">
              <p className="text-sm text-grayTextColor">Title</p>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full px-2 py-1 rounded-md bg-grayColor text-sm"
              />
            </div>
            <div className="w-full rounded-md">
              <p className="text-sm text-grayTextColor">Description</p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full h-20 px-2 py-1 rounded-md bg-grayColor text-sm"
              />
            </div>
            <div className="w-full rounded-md">
              <p className="text-sm text-grayTextColor">Due date</p>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-2 py-1 rounded-md bg-grayColor outline-none text-sm"
              />
            </div>

            <div className="w-full rounded-md">
              <p className="text-sm text-grayTextColor">Task Category</p>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-grayColor px-2 py-1 rounded-md outline-none"
              >
                <option value="">Select a category</option>
                {categoryData.length === 0 ? (
                  <option value="no category">No category</option>
                ) : (
                  categoryData.map((category) => (
                    <option key={category._id} value={category.category_name}>
                      {category.category_name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="w-full rounded-md">
              <p className="text-sm text-grayTextColor">Set Priority</p>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-grayColor px-2 py-1 rounded-md outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="w-full rounded-md">
              <p className="text-sm text-grayTextColor">Task Status</p>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-grayColor px-2 py-1 rounded-md outline-none"
              >
                <option value="todo">todo</option>
                <option value="progress">progress</option>
                <option value="completed">completed</option>
              </select>
            </div>
            <div>
              <button
                onClick={handleAddTask}
                className="text-sm px-4 py-0.5 bg-bgBlue text-white rounded-md"
                disabled={loading}
              >
                Add Task
              </button>
            </div>
          </div>

          <div className="w-full hidden md:block">
            <p className="text-white mt-1">Add new category</p>
            <Category />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;

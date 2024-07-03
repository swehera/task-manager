"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { format, differenceInCalendarDays } from "date-fns";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { API_BASE_URL } from "../../utils/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "@/redux/taskSlice";
import Link from "next/link";

const SingleTaskInfo = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const url = "http://localhost:3000"; // development time

  const [singleTaskInfo, setSingleTaskInfo] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const getSingleTask = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`);
          const data = await response.json();
          console.log("data", data);
          setSingleTaskInfo(data);
        } catch (error) {
          console.error("Error fetching single task:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    getSingleTask();
  }, [id, url]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "EEE, MMM d, yyyy");
  };

  const daysRemaining = (dateString) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    return differenceInCalendarDays(dueDate, today);
  };

  const renderDateMessage = (dueDate) => {
    const remainingDays = daysRemaining(dueDate);
    if (remainingDays < 0) {
      return (
        <p className="text-xl font-semibold text-white">
          Time finished for the task
        </p>
      );
    } else if (remainingDays === 0) {
      return (
        <p className="text-xl font-semibold text-white">
          Today is the last date for this task
        </p>
      );
    } else if (remainingDays === 1) {
      return (
        <p className="text-xl font-semibold text-white">
          You have 1 day for the task
        </p>
      );
    } else {
      return (
        <p className="text-xl font-semibold text-white">
          You have {remainingDays} day(s) for the task
        </p>
      );
    }
  };

  // that is for delete the task
  // const handleDelete = async () => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
  //       method: "DELETE",
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       console.log("Task deleted successfully", data);
  //       dispatch(deleteTask(id));
  //       router.push("/"); // Redirect to tasks list page
  //     } else {
  //       console.error("Error deleting task:", data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting task:", error);
  //   }
  // };
  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Task deleted successfully", data);
        dispatch(deleteTask(id));

        router.push("/"); // Redirect to tasks list page
      } else {
        console.error("Error deleting task:", data.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      await fetchTasks(); // Fetch the latest tasks after deletion
    }
  };

  const fetchTasks = async () => {
    if (userInfo) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/tasks`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          dispatch(addAllTasks(data.tasks));
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-2">
      {loading ? (
        <div className="w-full min-h-screen flex items-center justify-center">
          <p className=" text-2xl font-semibold text-white">Loading...</p>
        </div>
      ) : (
        <div className=" flex flex-col gap-y-2">
          <div className="flex items-center justify-center ">
            {singleTaskInfo.task?.dueDate &&
              renderDateMessage(singleTaskInfo.task.dueDate)}
          </div>
          <div className="py-1 px-3 w-full rounded-md bg-white flex items-center justify-between">
            <p className="text-sm font-semibold text-grayTextColor uppercase">
              Task Details
            </p>
            <div className=" flex items-center gap-x-2">
              <button
                onClick={handleDelete}
                className=" px-3 py-1 bg-bgRedColor text-white rounded-md text-sm"
              >
                Delete
              </button>
              <Link
                href={`/update-task/${id}`}
                className=" px-3 py-1 bg-yellowColor text-white rounded-md text-sm"
              >
                Update
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-2"></div>
          {/* new design  */}

          <div className="py-4 px-3 w-full rounded-md bg-white flex flex-col gap-1">
            <p className="text-sm font-semibold">
              Title: {singleTaskInfo.task?.title}
            </p>
            <p className="text-sm">{singleTaskInfo.task?.description}</p>
            <div className=" flex  flex-col md:flex-row gap-2 mt-3">
              <button
                className={`px-3 md:px-12 py-1 text-white rounded-md text-sm ${
                  singleTaskInfo.task?.priority === "medium" && "bg-[#FA9A43]"
                } ${
                  singleTaskInfo.task?.priority === "high" && "bg-bgRedColor"
                } ${singleTaskInfo.task?.priority === "low" && "bg-[#00D308]"}`}
              >
                {singleTaskInfo.task?.priority}
              </button>
              <button className=" px-3 md:px-12 py-1 bg-grayTextColor text-white rounded-md text-sm">
                {singleTaskInfo.task?.status}
              </button>
              {singleTaskInfo.task?.dueDate && (
                <button className=" px-3 md:px-12 py-1 bg-grayTextColor text-white rounded-md text-sm">
                  Due Date: {formatDate(singleTaskInfo.task.dueDate)}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleTaskInfo;

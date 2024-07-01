"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { format, differenceInDays } from "date-fns";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { API_BASE_URL } from "../../utils/apiConfig";

const SingleTaskInfo = () => {
  const { id } = useParams();
  // const url = "https://task-manager-hera.vercel.app"; // production time
  const url = "http://localhost:3000"; // development time

  const [singleTaskInfo, setSingleTaskInfo] = useState({});

  useEffect(() => {
    const getSingleTask = async () => {
      if (id) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`);
          const data = await response.json();
          console.log("data", data);
          setSingleTaskInfo(data);
        } catch (error) {
          console.error("Error fetching single task:", error);
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
    return differenceInDays(dueDate, today);
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-2">
      <div className="py-1 px-3 w-full rounded-md bg-white">
        <p className="text-sm font-semibold text-grayTextColor uppercase">
          View Details
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-2">
        <div className="flex items-center justify-center">
          {singleTaskInfo.task?.dueDate ? (
            daysRemaining(singleTaskInfo.task.dueDate) === 0 ||
            daysRemaining(singleTaskInfo.task.dueDate) < 0 ? (
              <p className="text-xl font-semibold text-white">
                Time finished for the task
              </p>
            ) : (
              <p className="text-xl font-semibold text-white">
                You have {daysRemaining(singleTaskInfo.task.dueDate)} day for
                the task
              </p>
            )
          ) : null}
        </div>
        <div
          className={`p-2 rounded-md w-[70%] md:w-[30%] ${
            singleTaskInfo.task?.status === "progress" && "bg-[#98C2FF]"
          } ${singleTaskInfo.task?.status === "completed" && "bg-[#84FF9F]"} ${
            singleTaskInfo.task?.status === "todo" && "bg-[#FFCC84]"
          }`}
        >
          {singleTaskInfo.task && (
            <div className="flex flex-col gap-1">
              <div className=" flex items-center justify-between">
                <p className="text-sm">
                  Due Date: {formatDate(singleTaskInfo.task.dueDate)}
                </p>
                <div>
                  <MdDelete className=" text-bgRedColor text-2xl cursor-pointer" />
                </div>
              </div>

              <p className="text-sm font-semibold">
                Title: {singleTaskInfo.task?.title}
              </p>
              <p className="text-sm">{singleTaskInfo.task?.description}</p>
              <button className="w-full py-0.5 bg-white text-grayTextColor rounded-md text-sm">
                {singleTaskInfo.task?.status}
              </button>
              <button
                className={`w-full py-0.5 text-white rounded-md text-sm ${
                  singleTaskInfo.task?.priority === "medium" && "bg-[#FA9A43]"
                } ${
                  singleTaskInfo.task?.priority === "high" && "bg-bgRedColor"
                } ${singleTaskInfo.task?.priority === "low" && "bg-[#00D308]"}`}
              >
                {singleTaskInfo.task?.priority}
              </button>
              <div>
                <FaEdit className=" text-grayTextColor text-2xl cursor-pointer" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleTaskInfo;

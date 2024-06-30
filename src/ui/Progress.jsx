"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";

const Progress = () => {
  const taskData = useSelector((state) => state.tasks.taskData) || [];

  console.log("all todo task", taskData);

  const progressTasks = taskData.filter((task) => task.status === "progress");

  useEffect(() => {
    console.log("progressTasks", progressTasks);
  }, [taskData, progressTasks]);

  return (
    <div className="w-full min-h-screen flex flex-col gap-2">
      <div className="py-1 px-3 w-full rounded-md bg-white">
        <p className="text-sm font-semibold text-grayTextColor uppercase">
          Progress Tasks
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {progressTasks.length === 0 ? (
          <p>No Progress Tasks</p>
        ) : (
          progressTasks.map((item) => (
            <div
              key={item._id}
              className={`p-2 rounded-md ${
                item.status === "progress" && "bg-[#98C2FF]"
              } ${item.status === "completed" && "bg-[#84FF9F]"} ${
                item.status === "todo" && "bg-[#FFCC84]"
              }`}
            >
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold">Title: {item.title}</p>
                <p className="text-sm line-clamp-2">{item.description}</p>
                <button className="w-full py-0.5 bg-white text-grayTextColor rounded-md text-sm">
                  {item.status}
                </button>
                <button
                  className={`w-full py-0.5 text-white rounded-md text-sm ${
                    item.priority === "medium" && "bg-[#FA9A43]"
                  } ${item.priority === "high" && "bg-bgRedColor"} ${
                    item.priority === "low" && "bg-[#00D308]"
                  }`}
                >
                  {item.priority}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Progress;

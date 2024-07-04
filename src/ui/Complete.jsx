"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Complete = () => {
  const taskData = useSelector((state) => state.tasks.taskData) || [];

  console.log("all todo task", taskData);

  const completedTasks = taskData.filter((task) => task.status === "completed");

  useEffect(() => {
    console.log("completedTasks", completedTasks);
  }, [taskData, completedTasks]);

  return (
    <div className="w-full min-h-screen flex flex-col gap-2">
      <div className="py-1 px-3 w-full rounded-md bg-white">
        <p className="text-sm font-semibold text-grayTextColor uppercase">
          Completed Tasks
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {completedTasks.length === 0 ? (
          <p>No Completed Task</p>
        ) : (
          completedTasks.map((item) => (
            <Link
              key={item?._id}
              href={`/single-task/${item?._id}`}
              className={`p-2 rounded-md ${
                item.status === "progress" && "bg-[#98C2FF]"
              } ${item.status === "completed" && "bg-[#84FF9F]"} ${
                item.status === "todo" && "bg-[#FFCC84]"
              }`}
            >
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold">Title: {item?.title}</p>
                <p className="text-sm line-clamp-2">{item?.description}</p>
                <button className="w-full py-0.5 bg-white text-grayTextColor rounded-md text-sm">
                  {item?.status}
                </button>
                <button
                  className={`w-full py-0.5 text-white rounded-md text-sm ${
                    item.priority === "medium" && "bg-[#FA9A43]"
                  } ${item.priority === "high" && "bg-bgRedColor"} ${
                    item.priority === "low" && "bg-[#00D308]"
                  }`}
                >
                  {item?.priority}
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Complete;

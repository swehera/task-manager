"use client";
import Link from "next/link";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useSelector } from "react-redux";

const Home = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const categoryData = useSelector((state) => state.category.category);
  const taskData = useSelector((state) => state.tasks.taskData) || [];

  // This is for search option
  const [search, setSearch] = useState("");

  console.log("Home page", userInfo);
  console.log("CategoryInfo", categoryData);
  console.log("TaskData", taskData);

  return (
    <div className="w-full min-h-[95vh]">
      {/* hello, user and add task section */}
      <div className="flex flex-col gap-y-2">
        <div>
          <p className="text-xl font-semibold text-white">
            Hola, {userInfo?.name}
          </p>
        </div>
        <div className="flex items-center justify-between bg-white px-3 py-1 rounded-md">
          <div>
            <p className="text-grayTextColor text-sm">My all added tasks</p>
          </div>
          <div className="w-[30%] bg-grayColor rounded-md">
            <input
              type="text"
              placeholder="Search by priority (high, mid, low)"
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md outline-none text-sm px-2 py-1 bg-grayColor"
            />
          </div>
        </div>
      </div>

      {/* add task and show task section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-3">
        <Link
          href={"/add-task"}
          className="bg-white flex items-center justify-center rounded-md p-2 h-auto"
        >
          <CiCirclePlus className="text-bgBlue text-[65px] cursor-pointer" />
        </Link>
        {taskData.length === 0 ? (
          <div className="flex items-center justify-center">
            <p className="text-2xl font-semibold text-white">No Task Added</p>
          </div>
        ) : (
          taskData
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.priority.toLowerCase().includes(search.toLowerCase());
            })
            .map((item) => (
              <div
                key={item?._id}
                className={`p-2 rounded-md ${
                  item?.status === "progress" && "bg-[#98C2FF]"
                } ${item?.status === "completed" && "bg-[#84FF9F]"} ${
                  item?.status === "todo" && "bg-[#FFCC84]"
                }`}
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold line-clamp-1">
                    Title: {item?.title}
                  </p>
                  <p className="text-sm line-clamp-2">{item?.description}</p>
                  <button className="w-full py-0.5 bg-white text-grayTextColor rounded-md text-sm">
                    {item?.status}
                  </button>
                  <button
                    className={`w-full py-0.5 text-white rounded-md text-sm ${
                      item?.priority === "medium" && "bg-[#FA9A43]"
                    } ${item?.priority === "high" && "bg-bgRedColor"} ${
                      item?.priority === "low" && "bg-[#00D308]"
                    }`}
                  >
                    {item?.priority}
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Home;

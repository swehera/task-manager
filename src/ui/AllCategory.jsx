"use client";

import { useSelector } from "react-redux";

const AllCategory = () => {
  const categoryData = useSelector((state) => state.category.category);
  return (
    <div className="w-full min-h-screen flex flex-col gap-2">
      <div className="py-1 px-3 w-full rounded-md bg-white">
        <p className="text-sm font-semibold text-grayTextColor uppercase">
          My all added category
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {categoryData.length === 0 ? (
          <p>No Todo Tasks</p>
        ) : (
          categoryData.map((item) => (
            <div
              key={item._id}
              //   className={`p-2 rounded-md ${
              //     item.status === "progress" && "bg-[#98C2FF]"
              //   } ${item.status === "completed" && "bg-[#84FF9F]"} ${
              //     item.status === "todo" && "bg-[#FFCC84]"
              //   }`}
              className=" bg-white rounded-md py-3"
            >
              <div className="flex items-center justify-center">
                <p className="text-sm line-clamp-2 font-semibold">
                  {item.category_name}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllCategory;

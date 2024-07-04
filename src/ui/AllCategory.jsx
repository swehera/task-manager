"use client";

import { setCategories } from "@/redux/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../../utils/apiConfig";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const AllCategory = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const categoryData = useSelector((state) => state.category.category);
  const url = `${API_BASE_URL}/api/category`;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo && userInfo.user) {
      const fetchCategories = async () => {
        try {
          const response = await fetch(`${url}?user_id=${userInfo.user}`);
          const data = await response.json();
          if (data.success) {
            dispatch(setCategories(data.categories));
          } else {
            toast.error(data.message || "Failed to fetch categories");
          }
        } catch (error) {
          console.error("Error fetching categories:", error);
          toast.error("An error occurred while fetching categories");
        }
      };

      fetchCategories();
    }
  }, [dispatch, userInfo]);

  console.log("categoryData", categoryData);
  console.log("userInfo", userInfo);

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
      <Toaster />
    </div>
  );
};

export default AllCategory;

"use client";

import { addCategory } from "@/redux/categorySlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../../utils/apiConfig";

const Category = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const categoryData = useSelector((state) => state.category.category);
  // const url = "https://task-manager-hera.vercel.app/api/category"; // Assuming your API endpoint is here
  const url = `${API_BASE_URL}/api/category`; // Assuming your API endpoint is here
  const [category_name, setCategory_Name] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  console.log("check add category", categoryData);

  const handleAddCategory = async (e) => {
    e.preventDefault();

    console.log("This is category component and check userInfo", userInfo);

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category_name: category_name,
          user_id: userInfo.user,
        }),
      });
      const categoryData = await response.json();
      console.log("This data from backend", categoryData);
      if (categoryData.success) {
        toast.success(categoryData?.message);
        dispatch(addCategory(categoryData?.savedCategory));
        setCategory_Name(""); // Clear input after successful addition
      } else if (categoryData?.message) {
        toast.error(categoryData?.message);
      } else {
        toast.error(categoryData?.error);
      }
    } catch (error) {
      console.log({ error: error });
      toast.error("An error occurred while adding category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-4 bg-white rounded-md flex flex-col gap-y-2">
      <div>
        <input
          type="text"
          value={category_name}
          onChange={(e) => setCategory_Name(e.target.value)}
          placeholder="Category name"
          className="w-full rounded-md bg-grayColor px-3 py-1 text-sm"
          disabled={loading}
        />
      </div>
      <div>
        <button
          onClick={handleAddCategory}
          className="px-3 py-1 bg-bgBlue text-white rounded-md text-sm"
          disabled={loading}
        >
          {loading ? <p>Loading...</p> : "Add Category"}
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default Category;

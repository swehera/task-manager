"use client";

import { addCategory, setCategories } from "@/redux/categorySlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { API_BASE_URL } from "../../utils/apiConfig";

const Category = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const categoryData = useSelector((state) => state.category.category);
  const url = `${API_BASE_URL}/api/category`;
  const [category_name, setCategory_Name] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!userInfo || !userInfo.user) {
      toast.error("User information not available");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category_name: category_name,
          user_id: userInfo.user,
        }),
      });
      const categoryData = await response.json();
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
      console.error({ error });
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
      {/* <div>
        <h2>Categories</h2>
        <ul>
          {categoryData.map((category) => (
            <li key={category.id}>{category.category_name}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Category;

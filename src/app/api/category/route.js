import { connect } from "@/db/db";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";

// export const POST = async (request) => {
//   connect();
//   try {
//     const reqBody = await request.json();
//     const { category_name, user_id } = await reqBody;
//     const exitingCategory = await Category.findOne({ category_name });
//     if (exitingCategory) {
//       return NextResponse.json({
//         message: "Category already added",
//         exitingCategory,
//       });
//     }
//     const newCategory = new Category({ category_name, user: user_id });
//     const saveCategory = await newCategory.save();
//     return NextResponse.json({
//       message: "Category added succussfully",
//       success: true,
//       saveCategory,
//     });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// };

export const POST = async (request) => {
  connect();
  try {
    const reqBody = await request.json();
    const { category_name, user_id } = reqBody;

    const existingCategory = await Category.findOne({ category_name });
    if (existingCategory) {
      return NextResponse.json({
        message: "Category already added",
        existingCategory,
      });
    }

    const newCategory = new Category({
      category_name,
      user: user_id, // Assign the user ID to the category
    });

    const savedCategory = await newCategory.save();

    return NextResponse.json({
      message: "Category added successfully",
      success: true,
      savedCategory,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const GET = async () => {
  connect();
  try {
    const categories = await Category.find({});
    return NextResponse.json({
      message: "Categories retrieved successfully",
      success: true,
      categories,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

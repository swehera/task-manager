import { connect } from "@/db/db";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  connect();
  try {
    const reqBody = await request.json();
    const { category_name, user_id } = reqBody;

    const existingCategory = await Category.findOne({
      category_name,
      user: user_id,
    });
    if (existingCategory) {
      return NextResponse.json({
        message: "Category already added",
        success: false,
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

export const GET = async (request) => {
  connect();
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("user_id");

    const categories = await Category.find({ user: user_id });

    return NextResponse.json({
      message: "Categories retrieved successfully",
      success: true,
      categories,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

import { connect } from "@/db/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export const POST = async (request) => {
  connect();
  try {
    const reqBody = await request.json();
    const { name, email, password } = await reqBody;
    // User validation
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          error: "User already exists",
        },
        { status: 500 }
      );
    }
    // Email Validatation
    const emailValidation = () => {
      return String(email)
        .toLocaleLowerCase()
        .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    if (!emailValidation()) {
      return NextResponse.json(
        {
          error: "Email is Not Valid",
        },
        { status: 500 }
      );
    }

    // Password hasing

    const salt = await bcryptjs.genSalt(10);
    const encryptedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: encryptedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created succussfully!",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

import { connect } from "@/db/db";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  connect();
  try {
    const reqBody = await request.json();
    const { email, password } = await reqBody;

    // User validation
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          error: "User does not exist",
        },
        { status: 500 }
      );
    }

    // Password validation
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        {
          error: "Invalid password",
        },
        { status: 400 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    const loggedData = {
      user: user._id,
      name: user.name,
      email: user.email,
      token, // Include the token in the loggedData
    };

    return NextResponse.json({
      message: "Logged in successfully!",
      success: true,
      loggedData,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

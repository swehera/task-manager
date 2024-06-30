import { connect } from "@/db/db";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
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
          error: "User does not exists",
        },
        { status: 500 }
      );
    }

    // Password validation
    console.log("user", user);

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        {
          error: "Invalid password",
        },
        { status: 400 }
      );
    }

    const loggedData = {
      id: user._id,
      name: user.name,
      email: user.email,
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

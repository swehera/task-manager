"use client";

import Image from "next/image";
import { logo } from "../../public/images";
import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "@/redux/userSlice";

const Login = () => {
  const url = "https://task-manager-hera.vercel.app"; //production time
  // const url = "http://localhost:3000"; // development time

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${url}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(email, password);
      console.log("data", data);
      console.log("data from backend", data?.loggedData);
      if (data?.success === true) {
        toast.success(data?.message);
        console.log("Dispatching saveUser with:", data?.loggedData);
        dispatch(saveUser(data?.loggedData));
      } else {
        toast.error(data?.error);
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("this is data from redux", userInfo);

  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      {loading ? (
        <p className="text-xl font-semibold text-white">Loading...</p>
      ) : (
        <div className="bg-white p-6 rounded-md w-[80%] md:w-[40%] h-auto flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-y-2">
            <div>
              <Image src={logo} alt="logo-image" width={100} height={100} />
            </div>
            <p className="text-bgBlue font-semibold">Login</p>
          </div>
          <div className="w-full flex flex-col gap-y-3">
            <div className="flex flex-col gap-y-1">
              <label className="text-grayTextColor text-sm">
                Email address
              </label>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-1 rounded-md bg-grayColor outline-none"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label className="text-grayTextColor text-sm">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-1 rounded-md bg-grayColor outline-none"
              />
            </div>
            <div>
              <button
                onClick={handleLogin}
                className="bg-bgBlue px-3 py-1 rounded-md text-white text-sm"
              >
                Login
              </button>
            </div>
            <div className="pb-2">
              <Link href={"/register"} className="text-sm text-grayTextColor">
                I don&apos;t have any account.{" "}
                <span className="text-bgBlue underline hover:text-bgBlue/90 duration-200 font-semibold">
                  Register
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Login;

"use client";

import Image from "next/image";
import { logo } from "../../public/images";
import { useDispatch } from "react-redux";
import { removeUser } from "@/redux/userSlice";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const SideBar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const [home, setHome] = useState(true);
  const [todo, setTodo] = useState(false);
  const [progress, setProgress] = useState(false);
  const [complete, setComplete] = useState(false);
  const [category, setCategory] = useState(false);

  const HomeActive = () => {
    setHome(true);
    setTodo(false);
    setProgress(false);
    setComplete(false);
    setCategory(false);
  };

  const TodoActive = () => {
    setHome(false);
    setTodo(true);
    setProgress(false);
    setComplete(false);
    setCategory(false);
  };

  const ProgressActive = () => {
    setHome(false);
    setTodo(false);
    setProgress(true);
    setComplete(false);
    setCategory(false);
  };

  const CompleteActive = () => {
    setHome(false);
    setTodo(false);
    setProgress(false);
    setComplete(true);
    setCategory(false);
  };

  const CategoryActive = () => {
    setHome(false);
    setTodo(false);
    setProgress(false);
    setComplete(false);
    setCategory(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
    router.push("/login");
  };

  return (
    <div className="  fixed top-0 left-0 h-full overflow-auto bg-white shadow-md w-64 hidden md:block m-3 rounded-md">
      <div className="px-3 py-6 min-h-[80vh]">
        <Link href={"/"} className="flex items-center justify-center mb-6">
          <Image src={logo} alt="logo" width={100} height={100} />
        </Link>

        <div className="flex flex-col gap-y-2">
          <Link
            href={"/"}
            onClick={HomeActive}
            className={`w-full text-center ${
              home && pathname === "/"
                ? "bg-yellowColor text-white"
                : "text-grayTextColor bg-grayColor hover:bg-yellowColor hover:text-white duration-200"
            } rounded-md py-0.5`}
          >
            Dashboard
          </Link>
          <Link
            href={"/todo"}
            onClick={TodoActive}
            className={`w-full text-center ${
              todo || pathname === "/todo"
                ? "bg-yellowColor text-white"
                : "text-grayTextColor bg-grayColor hover:bg-yellowColor hover:text-white duration-200"
            } rounded-md py-0.5`}
          >
            To-Do
          </Link>
          <Link
            href={"/progress"}
            onClick={ProgressActive}
            className={`w-full text-center ${
              progress || pathname === "/progress"
                ? "bg-yellowColor text-white"
                : "text-grayTextColor bg-grayColor hover:bg-yellowColor hover:text-white duration-200"
            } rounded-md py-0.5`}
          >
            In Progress
          </Link>
          <Link
            href={"/completed"}
            onClick={CompleteActive}
            className={`w-full text-center ${
              complete || pathname === "/completed"
                ? "bg-yellowColor text-white"
                : "text-grayTextColor bg-grayColor hover:bg-yellowColor hover:text-white duration-200"
            } rounded-md py-0.5`}
          >
            Completed
          </Link>
          <Link
            href={"/category"}
            onClick={CategoryActive}
            className={`w-full text-center ${
              category || pathname === "/category"
                ? "bg-yellowColor text-white"
                : "text-grayTextColor bg-grayColor hover:bg-yellowColor hover:text-white duration-200"
            } rounded-md py-0.5`}
          >
            Category
          </Link>
        </div>

        <div className="flex items-center justify-center mt-auto">
          <button
            onClick={handleLogout}
            className="bg-bgRedColor text-white w-[90%] py-0.5 rounded-md mt-6"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

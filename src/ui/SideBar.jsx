"use client";

import Image from "next/image";
import { logo } from "../../public/images";
import { useDispatch } from "react-redux";
import { removeUser } from "@/redux/userSlice";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideBar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

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

  return (
    <div className="w-full bg-white min-h-screen px-3 py-6 rounded-md relative">
      {/* logo section */}
      <Link href={"/"} className="flex items-center justify-center">
        <Image src={logo} alt="logo" width={100} height={100} />
      </Link>

      {/* menubar section */}
      <div className="py-4 flex flex-col gap-y-2">
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

      {/* logout section */}
      <div className="flex items-center justify-center">
        <button
          onClick={() => dispatch(removeUser())}
          className="bg-bgRedColor text-white w-[90%] py-0.5 rounded-md absolute bottom-16"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;

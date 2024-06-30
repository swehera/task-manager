"use client";
import Image from "next/image";
import React, { useState } from "react";
import { logo } from "../../public/images";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { removeUser } from "@/redux/userSlice";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  //   const dispatch = useDispatch();

  //for active section
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

  const pathname = usePathname();

  console.log("isOpen", isOpen, pathname);

  return (
    <div className=" block md:hidden z-50 sticky top-0 ">
      <div className=" relative">
        {/* this is section for mobile navbar */}
        <div className=" w-full bg-white py-3 px-4 flex items-center justify-between">
          <Link href={"/"}>
            <Image src={logo} alt="logo" width={60} height={60} />
          </Link>
          <div>
            <IoMenu
              onClick={() => setIsOpen(!isOpen)}
              className=" text-bgBlue text-4xl cursor-pointer"
            />
          </div>
        </div>

        {/* menu option section */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className=" bg-black/75 text-white min-h-screen w-full absolute z-40 top-[60px]"
          >
            <div className=" flex flex-col items-center justify-center py-5 gap-y-2">
              <Link
                href={"/"}
                onClick={HomeActive}
                className={`w-[50%] text-center ${
                  home && pathname === "/"
                    ? "bg-yellowColor text-white"
                    : "text-grayTextColor bg-grayColor hover:bg-yellowColor hover:text-white duration-200"
                } rounded-md py-0.5`}
              >
                Home
              </Link>
              <Link
                href={"/todo"}
                onClick={TodoActive}
                className={`w-[50%] text-center ${
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
                className={`w-[50%] text-center ${
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
                className={`w-[50%] text-center ${
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
                className={`w-[50%] text-center ${
                  category || pathname === "/category"
                    ? "bg-yellowColor text-white"
                    : "text-grayTextColor bg-grayColor hover:bg-yellowColor hover:text-white duration-200"
                } rounded-md py-0.5`}
              >
                Category
              </Link>

              {/* logout section */}
              {/* <div className=" bg-bgRedColor text-white w-[50%] flex items-center justify-center rounded-md text-sm py-0.5">
                <p>Logout</p>
              </div> */}
              {/* logout section */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;

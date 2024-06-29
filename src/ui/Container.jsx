"use client";
import { twMerge } from "tailwind-merge";

const Container = ({ children, className }) => {
  const newClassName = twMerge(
    "max-w-screen-xl mx-auto py-4 px-4 lg:px-0 ",
    className
  );
  return <div className={newClassName}>{children}</div>;
};

export default Container;

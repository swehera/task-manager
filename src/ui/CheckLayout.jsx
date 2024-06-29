"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const CheckLayout = ({ children }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const router = useRouter();

  useEffect(() => {
    if (userInfo === null) {
      router.push("/login");
    } else {
      router.push("/");
    }
  }, [userInfo, router]);

  return <div>{children}</div>;
};

export default CheckLayout;

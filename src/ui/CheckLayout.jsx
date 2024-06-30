"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { persistor } from "@/redux/store";

const CheckLayout = ({ children }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const router = useRouter();
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    const handleRehydration = () => {
      if (persistor.getState().bootstrapped) {
        setRehydrated(true);
      }
    };

    const unsubscribe = persistor.subscribe(handleRehydration);
    handleRehydration(); // Initial check

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (rehydrated) {
      if (userInfo === null) {
        router.push("/login");
      } else {
        router.push("/");
      }
    }
  }, [userInfo, router, rehydrated]);

  console.log("userInfo", userInfo);

  return <div>{children}</div>;
};

export default CheckLayout;

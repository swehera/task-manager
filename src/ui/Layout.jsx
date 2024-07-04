"use client";

import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import CheckLayout from "./CheckLayout";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Container from "./Container";
import { PersistGate } from "redux-persist/integration/react";
import MobileHeader from "./MobileHeader";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const [showSideBar, setShowSideBar] = useState(false);

  useEffect(() => {
    if (pathname === "/login" || pathname === "/register") {
      setShowSideBar(false);
    } else {
      setShowSideBar(true);
    }
  }, [pathname]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CheckLayout>
          {showSideBar && <MobileHeader />}
          <Container className="flex items-center  md:gap-x-6">
            <div
              className={`${showSideBar ? "md:w-[18%]  md:m-5" : " w-0 m-0"}`}
            >
              {showSideBar && <SideBar />}
            </div>
            <div className="w-full">{children}</div>
          </Container>
        </CheckLayout>
      </PersistGate>
    </Provider>
  );
};

export default Layout;

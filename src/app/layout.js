import { Inter } from "next/font/google";
import "../styles/globals.css";
import Layout from "@/ui/Layout";
import MobileHeader from "@/ui/MobileHeader";
import CheckLayout from "@/ui/CheckLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Management System",
  description: "Created by hera",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className=" bg-bgBlue min-h-screen">
          <Layout>{children}</Layout>
        </div>
      </body>
    </html>
  );
}

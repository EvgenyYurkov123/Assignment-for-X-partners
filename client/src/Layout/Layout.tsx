import { FC } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import NavBar from "../Pages/Navbar/Navbar";
import styles from "./Layout.module.css";
import { LayoutProps } from "../types/types";



export const Layout: FC<LayoutProps> = () => {
  return (
    <>
      <NavBar />
      <div className={`${styles.container} ${styles.main}`}>
        <Outlet  />
      </div>
      <Footer />
    </>
  );
};

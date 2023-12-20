import { FC } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import NavBar from "../pages/Navbar/Navbar";
import styles from "./Layout.module.css";

interface LayoutProps {
  title?: string;
}

export const Layout: FC<LayoutProps> = ({ title }) => {
  return (
    <>
      <NavBar />
      <div className={`${styles.container} ${styles.main}`}>
        {title && <h1 className="">{title}</h1>}
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

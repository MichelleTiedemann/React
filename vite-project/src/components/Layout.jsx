import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import styles from "../styles/layout.css";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className={styles["main-container"]}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
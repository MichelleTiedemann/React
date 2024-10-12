import React from "react";
import "../styles/navbar.css";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul className={styles.list}>
        <li>
          <NavLink
            className={({ isActive }) => {
              return isActive ? styles.isActive : styles.notActive;
            }}
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => {
              return isActive ? styles.isActive : styles.notActive;
            }}
            to={"/category/jewelery"}
          >
            Jewelery
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => {
              return isActive ? styles.isActive : styles.notActive;
            }}
            to={"/category/electronics"}
          >
            Electronics
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

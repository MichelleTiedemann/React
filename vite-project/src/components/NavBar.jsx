import React from "react";
import "../styles/navbar.scss";
import CartWidget from "./CartWidget";
import { NavLink } from "react-router-dom";
import { useCart } from "./CartContext";

const NavBar = () => {
  const { cartItems } = useCart();

  const categories = [
    "Limpiadores",
    "Serums",
    "Cremas",
    "Protectores solares",
    "Otros",
  ];

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/home"
          >
            Home
          </NavLink>
        </li>
        {categories.map((category) => (
          <li key={category}>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to={`/category/${category}`}
            >
              {category}
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/cart"
          >
            <CartWidget />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

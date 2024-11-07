import React from "react";
import cart from "../assets/cart.svg";
import { useCart } from "./CartContext";

const CartWidget = () => {
  const { getCartTotalQuantity } = useCart();
  return (
    <>
      <div className="cart-icon-container">
        <img className="cart-icon" src={cart} alt="cart" />
        <div className="cart-counter">{getCartTotalQuantity()}</div>
      </div>
    </>
  );
};

export default CartWidget;

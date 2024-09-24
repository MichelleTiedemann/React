import React from "react";
import cart from "../assets/cart.svg";

const CartWidget = () => {
  return (
    <>
      <img src={cart} alt="cart" style={{ width: "30px" }} />
      <span>(5)</span>
    </>
  );
};

export default CartWidget;

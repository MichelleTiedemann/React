import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useCart } from "./CartContext";

const ItemDetail = ({ product }) => {
  const data = useCart();
  const { addToCart } = data;
  const [quantity, setQuantity] = useState(1);
  const notify = () => toast("Producto agregado al carrito");
  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <div>
        {console.log("Datos del artículo:", product)}
        <img
          src={product.pictureUrl}
          alt={product.title}
          style={{ width: 300 }}
        />
        <h1>{product.title}</h1>
        <span>{product.description}</span>

        <div style={{ marginTop: "20px" }}>
          <h3>Precio: ${product.price}</h3>
          <h4>En stock: {product.stock}</h4>

          <div style={{ display: "flex", alignItems: "center" }}>
            <button onClick={handleDecrement} disabled={quantity <= 1}>
              -
            </button>
            <span style={{ margin: "0 10px" }}>{quantity}</span>
            <button
              onClick={handleIncrement}
              disabled={quantity >= product.stock}
            >
              +
            </button>
          </div>

          <button onClick={() => addToCart(product, quantity)}>
            Agregar al carrito
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ItemDetail;

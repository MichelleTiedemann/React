import { useState } from "react";
import { useCart } from "./CartContext";
import Checkout from "./checkout";
const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  console.log(cartItems.map((item) => item));
  if (isCheckingOut) {
    //renderizar el componente si se a hecho click en el boton
    return <Checkout />;
  }

  const handleCheckout = () => {
    setIsCheckingOut(true);
  };

  return (
    <>
      <p className="tu-carrito">Tu carrito</p>
      {cartItems.length === 0 && (
        <p className="tu-carrito-vacio">Tu carrito esta vacio</p>
      )}
      {cartItems.length !== 0 && (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>Producto: {item.title}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio: ${item.price * item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          ))}
          <p>Total: ${getCartTotal()}</p>
          <button onClick={clearCart}>Limpiar carrito</button>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </>
  );
};

export default CartPage;

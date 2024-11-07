import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const readDB = async () => {
    const itemsList = [];
    const response = await getDocs(collection(db, "carrito"));
    console.log(response);
    response.forEach((doc) => {
      itemsList.push({ id: doc.id, ...doc.data() });
    });
    console.log(itemsList);
    setCartItems(itemsList);
  };

  useEffect(() => {
    readDB();
  }, []);

  const addToCart = async (data, quantity) => {
    console.log(data);
    await addDoc(collection(db, "carrito"), { ...data, quantity: quantity });
    readDB();
    Swal.fire({
      title: "Agregaste a tu carrito!",

      text: `${data.title}`,

      icon: "success",
    });
  };

  const removeFromCart = async (id) => {
    const collectionRef = collection(db, "carrito");
    const querySnapshot = await getDocs(collectionRef);

    try {
      await querySnapshot.forEach((docSnap) => {
        if (docSnap.data().id === id) {
          const docRef = doc(db, "carrito", docSnap.id);
          deleteDoc(docRef);
        }
      });
      readDB();
    } catch (error) {
      console.error("Error eliminando el producto:", error);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const getCartTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

import { createContext } from "react";
import React from "react";
import { useEffect, useState } from "react";
export const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const data = {
    products,
    setProducts,
  };
  return (
    <ProductsContext.Provider value={data}>{children}</ProductsContext.Provider>
  );
};

export default ProductsContextProvider;

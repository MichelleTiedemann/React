import React, { useEffect, useState, useContext } from "react";
import { ProductsContext } from "../context/ProductsContextProvider";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
  const data = useContext(ProductsContext);
  const { products } = data;
  const { id } = useParams();
  const { categoryId } = useParams();
  const product = products.find((productToFind) => productToFind.id === id);

  console.log(id);
  console.log(categoryId);

  return <ItemDetail product={product} />;
};

export default ItemDetailContainer;

import React, { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import products from "../assets/dataProducts.json";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const product = products.find(
      (productToFind) => productToFind.id === Number(id)
    );
    console.log(product);
    setProduct(product);
  }, [id]);

  return product && <ItemDetail product={product} />;
};

export default ItemDetailContainer;

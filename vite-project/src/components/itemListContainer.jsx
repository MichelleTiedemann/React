import React, { useEffect, useState } from "react";
import Item from "./Item";
import dataProducts from "../assets/dataProducts.json";
import "../styles/navbar.scss";

const ItemListContainer = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = new Promise((resolve) => {
      setTimeout(() => {
        resolve(dataProducts);
      }, 2000);
    });

    fetchProducts
      .then((data) => {
        if (category) {
          const filteredProducts = data.filter(
            (product) => product.category === category
          );
          setProducts(filteredProducts);
        } else {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="item-list-container">
      {loading ? (
        <p>Cargando productos...</p>
      ) : products.length > 0 ? (
        <div className="item-grid">
          {products.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p>Lo sentimos, no se encontraron productos en esta categoría.</p>
      )}
    </div>
  );
};

export default ItemListContainer;

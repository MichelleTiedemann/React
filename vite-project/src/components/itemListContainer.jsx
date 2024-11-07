import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Item from "./Item";
import "../styles/navbar.scss";
import { ProductsContext } from "../context/ProductsContextProvider";

const ItemListContainer = ({ category }) => {
  const data = useContext(ProductsContext);
  const { products, setProducts } = data;
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Aquí obtienes el ID del documento
        ...doc.data(), // Aquí obtienes los datos del documento
      }));

      if (category) {
        //filtar los productos segun su categoria
        const filteredProducts = data.filter(
          (product) => product.category === category
        );
        setProducts(filteredProducts);
      } else {
        setProducts(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
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
        <p>No se encontraron productos en esta categoría.</p>
      )}
    </div>
  );
};

export default ItemListContainer;

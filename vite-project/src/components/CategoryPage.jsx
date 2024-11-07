import React from "react";
import { useParams } from "react-router-dom";
import ItemListContainer from "./ItemListContainer";

const CategoryPage = () => {
  const { categoryId } = useParams();
  console.log(categoryId);
  return (
    <div>
      <h2>{categoryId}</h2>
      <ItemListContainer category={categoryId} />
    </div>
  );
};

export default CategoryPage;

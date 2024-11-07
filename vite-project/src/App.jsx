import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Contact from "./components/Contact";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { CartProvider } from "./components/CartContext";
import CategoryPage from "./components/CategoryPage";
import CartPage from "./components/CartPage";
import ProductsContextProvider from "./context/ProductsContextProvider";

function App() {
  return (
    <CartProvider>
      <ProductsContextProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/detail/:id" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ProductsContextProvider>
    </CartProvider>
  );
}

export default App;

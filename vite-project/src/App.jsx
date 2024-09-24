import NavBar from "./components/NavBar";
import CartWidget from "./components/CartWidget";
import ItemListContainer from "./components/itemListContainer";

function App() {
  return (
    <>
      <NavBar />
      <ItemListContainer greeting="¡Bienvenidos a nuestra tienda!" />
    </>
  );
}

export default App;

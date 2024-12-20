import { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import "../global/styles.scss";

const Checkout = ({ products }) => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    confirmEmail: "",
  });

  const [errors, setErrors] = useState({});
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const updateStock = async (cartItems) => {
    try {
      for (const item of cartItems) {
        const { id, stock } = item; // Obtén el ID del producto y la cantidad
        const productRef = doc(db, "productos", id); // Referencia al documento del producto

        // Actualiza el stock, restando la cantidad comprada
        await updateDoc(productRef, {
          stock: increment(-stock), // Restamos la cantidad del stock
        });

        console.log(
          `Stock de ${item.title} actualizado: ${stock} unidades vendidas.`
        );
      }
      console.log("Todos los stocks han sido actualizados exitosamente");
    } catch (error) {
      console.error("Error actualizando el stock:", error);
    }
  };
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es requerido";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido";
    } else if (!/^\d{10}$/.test(formData.telefono)) {
      newErrors.telefono = "El teléfono debe tener 10 dígitos";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = "Los emails no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (cartItems.length === 0) {
      setErrors({ general: "El carrito está vacío" });
      return;
    }

    setLoading(true);

    try {
      const order = {
        buyer: {
          nombre: formData.nombre,
          apellido: formData.apellido,
          telefono: formData.telefono,
          email: formData.email,
        },
        items: cartItems.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          stock: item.stock,
        })),
        total: getCartTotal(),
        date: Timestamp.fromDate(new Date()),
      };

      // Guardar en Firebase
      const docRef = await addDoc(collection(db, "orders"), order);
      setOrderId(docRef.id);
      updateStock(cartItems);
      clearCart();
    } catch (error) {
      setErrors({ general: "Error al procesar la orden" });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div>
        <h2>¡Orden completada!</h2>
        <p>
          Tu número de orden es: <span>{orderId}</span>
        </p>
        <button onClick={() => navigate("/")}>Volver a la tienda</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Checkout</h2>

      {/* Resumen del carrito */}
      <div className="order-item-container">
        <h3>Resumen de la orden:</h3>
        {cartItems.map((item) => (
          <div className="order-item" key={item.id}>
            <div>
              <h4>{item.title}</h4>
              <p>Cantidad: {item.stock}</p>
            </div>
            <p>${item.price * item.stock}</p>
          </div>
        ))}
        <div>
          <h3>Total: ${getCartTotal()}</h3>
        </div>
      </div>

      {/* Formulario */}
      <form className="order-form" onSubmit={handleSubmit}>
        {errors.general && <div>{errors.general}</div>}

        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
          {errors.nombre && <p>{errors.nombre}</p>}
        </div>

        <div>
          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleInputChange}
          />
          {errors.apellido && <p>{errors.apellido}</p>}
        </div>

        <div>
          <label>Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
          />
          {errors.telefono && <p>{errors.telefono}</p>}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label>Confirmar Email</label>
          <input
            type="email"
            name="confirmEmail"
            value={formData.confirmEmail}
            onChange={handleInputChange}
          />
          {errors.confirmEmail && <p>{errors.confirmEmail}</p>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Procesando..." : "Completar Orden"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;

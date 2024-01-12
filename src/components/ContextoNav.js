import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { userApi } from "../api/userApi";

const ContextoNav = createContext();

export const ContextoProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [Roll, setRoll] = useState("public");
  const [showVerP, setShowVerP] = useState(false);
  const [showPagos, setShowPagos] = useState(false);
  const [open, setOpen] = useState(false);

  const [imageUrl, setimageUrl] = useState("");
  const [name, setnameProduct] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState(0);
  const [stock, setstock] = useState();
  const [tipoDePago, settipoDePago] = useState();


  const [nombreUsua, setnombreUsua] = useState();
  const [imagenUsua, setimagenUsua] = useState();

  const navigate = useNavigate();

  function convertir(price) {
    if (price !== null) {
      return price.toLocaleString("es-CO");
    } else {
      return "Precio no disponible";
    }
  }

  async function realizarCompra() {
    const result = await userApi.get(`https://liquors-golden-production.up.railway.app/api/orders/create`,
    {
      customerId: 1,
      addressId: 1,
      statusId: 1,
      productIds: cartItems
    }
    );
    console.log(result.data)
  }

  const Limpiar = async () => {
    setnameProduct("");
    setdescription("");
    setprice("");
    setimageUrl("");
    setstock("");
  };

  const handleTipoPagoChange = (event) => {
    settipoDePago(event.target.value); // Actualizamos el estado cuando cambia la selección
  };

  const openshowVerP = () => {
    setShowVerP(true);
    Limpiar();
  };

  const closeshowVerP = () => {
    setShowVerP(false);
    Limpiar();
  };
  const openshowPagos = () => {
    if (Roll === "public") {
     navigate("/login");
      setOpen(false);
      Swal.fire({
        icon: "info",
        title: "Logueate primero mano 🤦‍♂️",
        background: "rgba(0, 0, 0, 0.969)",
        color: "#fff",
        confirmButtonColor: "#003049",
      });
    } else {
      if (tipoDePago === "Tarjeta") {
        setShowPagos(true);
      } else {
        setCartItems([])
        alert("Preparate en la puerta que voy pa alla");
      }
    }
  };

  const closesPagos = () => {
    setShowPagos(false);
    Limpiar();
  };

  const gestionToken = (token) => {
    setRoll(token);
  };

  // agregar al carrito
  const addToCart = (product) => {
    // Verificar si el producto ya está en el carrito
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si el producto ya está en el carrito, aumenta la cantidad
      const updatedCart = cartItems.map((item) => {
        console.log(item.id, product.id);
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        console.log(item.id, product.id);
        return item;
      });

      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        background: "rgba(0, 0, 0, 0.969)",
        color: "#fff",
        title: "Se sumó el producto",
        text: product.name,
      });
      setCartItems(updatedCart);
      closeshowVerP();
    } else {
      // Si el producto no está en el carrito, agrégalo con cantidad 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        background: "rgba(0, 0, 0, 0.969)",
        color: "#fff",
        title: "Se agregó el producto",
        text: product.name,
      });
      closeshowVerP();
    }
  };

  // Eliminar del carrito
  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems
      .map((product) => {
        if (product.id === productId) {
          // Si la cantidad es mayor que 1, reducimos la cantidad en 1
          if (product.quantity > 1) {
            return {
              ...product,
              quantity: product.quantity - 1,
            };
          }
          // Si la cantidad es igual a 1, eliminamos el producto del carrito
          return null;
        }
        return product;
      })
      .filter(Boolean); // Filtramos los productos nulos (eliminados)

    setCartItems(updatedCartItems);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);
  };

  return (
    <ContextoNav.Provider
      value={{
        handleTipoPagoChange,
        setOpen,
        open,
        imagenUsua,
        setimagenUsua,
        showPagos,
        openshowPagos,
        closesPagos,
        setnombreUsua,
        nombreUsua,
        convertir,
        showVerP,
        closeshowVerP,
        openshowVerP,
        stock,
        price,
        description,
        name,
        imageUrl,
        cartItems,
        Roll,
        addToCart,
        removeFromCart,
        calculateSubtotal,
        gestionToken,
        realizarCompra
      }}
    >
      {children}
    </ContextoNav.Provider>
  );
};

export const useCarrito = () => {
  return useContext(ContextoNav);
};

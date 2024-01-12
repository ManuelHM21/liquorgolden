import React, { createContext, useContext, useState, useEffect } from "react";
import { userApi } from "../api/userApi";
import Swal from "sweetalert2";

const LicoresContext = createContext();

export function ProductosContext({ children, tipo }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  // Variables de estados
  const [imageUrl, setimageUrl] = useState("");
  const [name, setnameProduct] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState();
  const [stock, setstock] = useState();
  const [statusId, setstatusId] = useState(1);

  const [quantity, setquantity] = useState();

  const [selectedMedida, setSelectedMedida] = useState();
  const [selectedCategoria, setSelectedCategoria] = useState();

  const [GcategoryId, setGcategoryId] = useState([]);

  const [proportionId, setproportionId] = useState([]);

  const [validacionM, setValidacionM] = useState(false);
  const [idModificar, setIdModificar] = useState(0);
  const [filter, setFilter] = useState("");

  const [showModalOfertas, setShowModalOfertas] = useState(false);
  const [showModalCrear, setShowModalCrear] = useState(false);
  const [showModalModificar, setShowModalModificar] = useState(false);


  const [dropdownAbierto, setDropdownAbierto] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const [estado, setestado] = useState(true);

  const cancelarEstado = () => {
    setestado(true);
  };
  

  useEffect(() => {
    cargarCategorias();
    cargarPropo();
    cargarDatos();
  }, []);

  const handleMedidaChange = (event) => {
    setSelectedMedida(event.target.value); // Actualizamos el estado cuando cambia la selección
  };

  const handleCategoriaChange = (event) => {
    setSelectedCategoria(event.target.value); // Actualizamos el estado cuando cambia la selección
  };

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    setImageFile(selectedFile);
  };

  async function cargarDatos() {
    const result = await userApi.get(`https://liquors-golden-production.up.railway.app/api/products/getAll`);
    setData(result.data);
    console.log(result.data)
  }

  async function cargarPropo() {
    const result = await userApi.get(
      "https://liquors-golden-production.up.railway.app/api/proportions/getAll"
    );
    setproportionId(result.data);
    console.log(result.data);
  }

  async function cargarCategorias() {
     const result = await userApi.get(
       "https://liquors-golden-production.up.railway.app/category/getAll"
     );
     setGcategoryId(result.data);
     console.log(result.data);
   }

  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        String(item.id).includes(filter) ||
        item.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredData(filtered);
  }, [data, filter]);

  const agregarLicor = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !stock) {
      Swal.fire({
        icon: "error",
        title: "Todos los campos son obligatorios",
        background: "rgba(0, 0, 0, 0.969)",
        color: "#fff",
        confirmButtonColor: "#003049",
      });
      return;
    }

    await userApi.post(
      `https://liquors-golden-production.up.railway.app/api/products`,
      {
        name,
        description,
        imageUrl,
        price,
        stock,
        categoryId: selectedCategoria,
        statusId,
        proportionId: selectedMedida,
      }
    );
    closeModalCrear();

    cargarDatos();
    Limpiar();
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
      title: "Se Agregó:",
      text: name,
    });
  };

  function convertir(precio) {
    if (precio !== null) {
      return precio.toLocaleString("es-CO");
    } else {
      return "Precio no disponible";
    }
  }

  const eliminarLicor = async (id) => {
    const respuesta = await userApi.delete(`https://liquors-golden-production.up.railway.app/api/products/remove/${id}`)
    cargarDatos()
    console.log(respuesta.config.data)
  };

  const activarModificacion = async (id) => {
    const respuesta = await userApi.get(
      `https://liquors-golden-production.up.railway.app/api/products/get/${id}`
    );
    setnameProduct(respuesta.data.name);
    setdescription(respuesta.data.description);
    setprice(respuesta.data.price);
    setimageUrl(respuesta.data.imageUrl);
    setSelectedCategoria(respuesta.data.category.id);
    setSelectedMedida(respuesta.data.proportion.id);
    setstock(respuesta.data.stock);
    setValidacionM(true);
    setIdModificar(id);
    openModalModificar(true);
    console.log(respuesta.data)
  };

  const modificarLicor = async (e) => {
    e.preventDefault();
    try {
      const response = await userApi.put(`https://liquors-golden-production.up.railway.app/api/products/update`, {
          id: idModificar,
          name,
          description,
          price,
          stock,
          categoryId: selectedCategoria,
          proportionId: selectedMedida,
          statusId,
      });

      // Aquí puedes acceder a la respuesta, por ejemplo, response.data si estás utilizando axios
      console.log('Respuesta de la petición:', response.config.data);

      // Puedes realizar más acciones con la respuesta si es necesario
  } catch (error) {
      // Manejo de errores
      console.error('Error en la petición:', error);
  }
    setValidacionM(false);
    cargarDatos();
    Limpiar();
    setShowModalModificar(false);
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
      title: "Se Modificó correctamente:",
      text: name,
    });
  };

  const CancelarmodificarLicor = async (e) => {
    e.preventDefault();
    setValidacionM(false);
    cargarDatos();
    Limpiar();
  };

  const Limpiar = async () => {
    setnameProduct("");
    setdescription("");
    setprice("");
    setimageUrl("");
    setstock("");
    setquantity("")
  };

  const openModalCrear = () => {
    setShowModalCrear(true);
    Limpiar();
  };

  const closeModalCrear = () => {
    setShowModalCrear(false);
    Limpiar();
  };

  const openModalModificar = () => {
    setShowModalModificar(true);
  };

  const closeModalModificar = () => {
    setShowModalModificar(false);
    Limpiar();
  };

  const openModalOferta = () => {
    setShowModalOfertas(true);
  };

  const closeModalOferta = () => {
    setShowModalOfertas(false);
    Limpiar();
  };


  // Crear Oferta
  const crearOferta = async (e) => {
    e.preventDefault();
    const respuesta = await userApi.put(`https://liquors-golden-production.up.railway.app/api/products/discount/${quantity}/${idModificar}`)
    console.log(respuesta, quantity,idModificar);
    Limpiar()
  };

  const filtrarPorDescuentoActivo = () => {
    const productosConDescuento = filteredData.filter(producto => producto.discountActive === true);
    setProductosFiltrados(productosConDescuento);
  };

  return (
    <LicoresContext.Provider
      value={{
        cancelarEstado,
        setestado,
        estado,
        filtrarPorDescuentoActivo,
        showModalOfertas,
        crearOferta,
        showModalCrear,
        openModalCrear,
        closeModalCrear,
        showModalModificar,
        openModalModificar,
        closeModalModificar,
        GcategoryId,
        tipo,
        data,
        filteredData,
        imageUrl,
        name,
        description,
        price,
        stock,
        statusId,
        setimageUrl,
        setnameProduct,
        setdescription,
        setprice,
        setstock,
        validacionM,
        idModificar,
        filter,
        imageFile,
        cargarDatos,
        agregarLicor,
        setValidacionM,
        setIdModificar,
        setFilter,
        convertir,
        eliminarLicor,
        activarModificacion,
        modificarLicor,
        CancelarmodificarLicor,
        dropdownAbierto,
        setDropdownAbierto,
        handleImageUpload,
        setstatusId,
        handleCategoriaChange,
        selectedCategoria,
        handleMedidaChange,
        selectedMedida,
        proportionId,
        quantity,
        setquantity,
        openModalOferta,
        closeModalOferta,
        productosFiltrados
      }}
    >
      {children}
    </LicoresContext.Provider>
  );
}

export function useLicores() {
  return useContext(LicoresContext);
}

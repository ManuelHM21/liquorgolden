import React, { useState, useEffect } from "react";
import { useLicores } from "./ProductosContext";
import CrearOferta from "./ModalCrearOferta";
import Swal from "sweetalert2";
import { userApi } from "../api/userApi.js";
import "animate.css/animate.min.css";

const Table = () => {
  const {
    openModalOferta,
    closeModalOferta,
    showModalOfertas,
    convertir,
    filteredData,
    activarModificacion,
    estado,
    setestado,
  } = useLicores();

  const [Bebidas, setBebidas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const result = await userApi.get(
        `https://liquors-golden-production.up.railway.app/api/products/getAll`
      );
      console.log(result.data);

      // Filtra los productos con discountActive en true
      const filteredProducts = result.data.filter(
        (product) => product.discountActive
      );

      setBebidas(filteredProducts);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        background: "rgba(0, 0, 0, 0.969)",
        color: "#fff",
        confirmButtonColor: "#003049",
      });
      setBebidas([]);
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBebidas = Bebidas.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cambiarEstado = () => {
    setestado(false);
  };

  const cancelarEstado = () => {
    setestado(true);
    getUsers();
  };

  return (
    <div className="gap-4 transition-opacity animate-aparecer opacity-100">
      <div className="transition-opacity animate-aparecer opacity-100">
        <div className="grow flex justify-between p-5">
          <div>
            <h1 className="text-white grow flex justify-center text-4xl ">
              {estado === true ? (
                <b>Todas las ofertas activas</b>
              ) : (
                <b>Lista de productos que puedes ofertar</b>
              )}
            </h1>
          </div>
          <div className="flex justify-between gap-10">
            <div>
              <div className="flex justify-center items-center transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105 duration-50">
                <div>
                  {estado === true ? (
                    <button
                      type="submit"
                      className="font-bold flex bg-transparent hover:bg-blue-500 hover:text-white text-blue-700 border border-blue-700 rounded-xl focus:outline-none px-3 py-2"
                      onClick={cambiarEstado}
                    >
                      <svg
                        className="justify-center w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Crear Oferta
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="font-bold flex justify-center items-center gap-2 bg-transparent hover:bg-red-600 hover:text-white text-red-600 border border-red-600 rounded-xl focus:outline-none px-3 py-2"
                      onClick={cancelarEstado}
                    >
                    <div>
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                    </div>
                      
                      <h1>Cancelar oferta</h1>
                      
                    </button>
                  )}
                </div>
              </div>
              <CrearOferta
                showModal={showModalOfertas}
                closeModal={closeModalOferta}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                className="pl-10 px-4 py-2 border rounded-xl bg-black bg-opacity-70 text-white outline-none w-full sm:w-64"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={handleSearchChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[530px] overflow-x-auto min-h-[530px]">
          <table className="table-auto w-full text-white bg-black bg-opacity-30">
            <thead className="z-10 sticky top-0 bg-black bg-opacity-90">
              <tr>
                <th className="p-2">
                  <b>Id</b>
                </th>
                <th>
                  <b>Vista</b>
                </th>
                <th className="text-start">
                  <b>Nombre</b>
                </th>
                <th className="text-start">
                  <b>Medida</b>
                </th>
                <th className="text-start">
                  <b>Cant</b>
                </th>
                <th className="text-start">
                  <b>Precio antes</b>
                </th>
                <th className="text-start">
                  <b>Precio actual</b>
                </th>
                <th className="text-start">
                  <b>Estado</b>
                </th>
                <th className="text-start">
                  <b>Accion</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {estado === true
                ? filteredBebidas.reverse().map((item) => (
                    <tr key={item.id} className="animate__animated animate__fadeIn w-[8rem] border-b">
                      <td className="text-center">
                        <b>{item.id}</b>
                      </td>
                      <td className=" flex tems-center justify-center">
                        <img
                          className={`w-[5rem] ${
                            item.cantidad < 2 ? "grayscale" : ""
                          }`}
                          src={item.imageUrl}
                          alt={`Imagen de ${item.name}`}
                        />
                      </td>
                      <td className="text-start">{item.name}</td>
                      <td className="text-start">
                        {item.proportion.quantity}
                        <b></b>
                      </td>
                      <td className="text-start">{item.stock}</td>
                      <td className="text-start">
                        <b>$</b>
                        {convertir(item.price)}
                      </td>
                      <td className="text-start">
                        <b>$</b>
                        {convertir(item.offerPrice)}
                      </td>
                      <td className="text-start">
                        {item.stock < 2 ? (
                          <h1 className="rounded-md w-fit px-2 bg-[#540b0e] bg-opacity-80">
                            <p className="text-sm text-center">Agotado</p>
                          </h1>
                        ) : (
                          <h1 className="rounded-md w-fit px-3 bg-[#31572c] bg-opacity-80 ">
                            <p className="text-sm text-center">Stock</p>
                          </h1>
                        )}
                      </td>
                      <td className="">
                        <button
                          type="submit"
                          className="flex gap-2 items-center rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-red-700 shadow-sm hover:bg-red-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105 duration-50"
                          //onClick={() => eliminarLicor(item.id)}
                        >
                          <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          Dar de baja
                        </button>
                      </td>
                    </tr>
                  ))
                : filteredData.reverse().map((item) => (
                    <tr key={item.id} className={`animate__animated animate__fadeIn w-[8rem] border-b`}>
                      <td className="text-center">
                        <b>{item.id}</b>
                      </td>
                      <td className=" flex tems-center justify-center">
                        <img
                          className={`w-[5rem] ${
                            item.cantidad < 2 ? "grayscale" : ""
                          }`}
                          src={item.imageUrl}
                          alt={`Imagen de ${item.name}`}
                        />
                      </td>
                      <td className="text-start">{item.name}</td>
                      <td className="text-start">
                        {item.proportion.quantity}
                        <b></b>
                      </td>
                      <td className="text-start">{item.stock}</td>
                      <td className="text-start">
                        <b>$</b>
                        {convertir(item.price)}
                      </td>
                      <td className="text-start">
                        <b>$</b>
                        {convertir(item.offerPrice)}
                      </td>
                      <td className="text-start">
                        {item.stock < 2 ? (
                          <h1 className="rounded-md w-fit px-2 bg-[#540b0e] bg-opacity-80">
                            <p className="text-sm text-center">Agotado</p>
                          </h1>
                        ) : (
                          <h1 className="rounded-md w-fit px-3 bg-[#31572c] bg-opacity-80 ">
                            <p className="text-sm text-center">Stock</p>
                          </h1>
                        )}
                      </td>
                      <td className="">
                        <button
                          type="submit"
                          className="flex gap-2 items-center rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-blue-500 shadow-sm hover:bg-blue-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105 duration-50"
                          onClick={() => {
                            activarModificacion(item.id);
                            openModalOferta();
                          }}
                        >
                          <svg
                            className="w-6 h-6 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m7 13 6-6m-5-.5h.01m2.98 7H11m1.007-11.313a2.75 2.75 0 0 0 2.1.87 2.745 2.745 0 0 1 2.837 2.837 2.749 2.749 0 0 0 .87 2.1 2.747 2.747 0 0 1 0 4.014 2.748 2.748 0 0 0-.87 2.1 2.746 2.746 0 0 1-2.837 2.837 2.75 2.75 0 0 0-2.1.87 2.748 2.748 0 0 1-4.014 0 2.75 2.75 0 0 0-2.1-.87 2.744 2.744 0 0 1-2.837-2.837 2.749 2.749 0 0 0-.87-2.1 2.747 2.747 0 0 1 0-4.014 2.75 2.75 0 0 0 .87-2.1 2.745 2.745 0 0 1 2.838-2.837 2.749 2.749 0 0 0 2.1-.87 2.748 2.748 0 0 1 4.013 0Z"
                            />
                          </svg>
                          Ofertar
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;

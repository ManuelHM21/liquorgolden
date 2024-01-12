import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userApi } from "../api/userApi";
import { useCarrito } from "./ContextoNav"; 

const View = () => {
  const [users, setUsers] = useState([]);
  const params = useParams();
  const { addToCart } = useCarrito();

  useEffect(() => {
    cargarDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cargarDatos = async () => {
    const result = await userApi.get(
      `http://localhost:8080/api/ofertas/${params.id}`
    );
    setUsers(result.data);
    console.log(result.data);
  };

  function convertir(precio=0) {
    return precio.toLocaleString("es-CO");
  }

  function descontar(precio, porcentaje) {
    const operacion = precio * (1 - porcentaje / 100);
    const precio_descuento = convertir(operacion);
    return precio_descuento;
  }

  return (
    <div className="mt-32 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-1">
      <div className="p-6 bg-white grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:gap-x-9 rounded-[1rem]">
        <div className="aspect-h-1 aspect-w-1 w-[100%] overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 rounded-[1rem]">
          <img
            src={users.img}
            alt={users.id}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="flex flex-col justify-around">
          <h1 className="text-5xl mb-15 mt-11">
            <b>{users.name}</b>
          </h1>
          <h1 className="text-xl">
            Los licores son aguardientes compuestos que reciben una
            significativa adición de sabores provenientes de sustancias que no
            generan alcohol, como hierbas, semillas , frutas, siropes de sabores
            y diferentes procesos mas que añaden sabor y características
            diferentes respecto al destilado original.
          </h1>
          <div className="flex gap-7">
            <h3 className="mt-1 text-3xl text-black">
              $ {descontar(users.precio, users.porcentaje)}
            </h3>
            <h3 className="mt-1 text-3xl text-red-900 line-through">
              $ {convertir(users.precio)}
            </h3>
          </div>
          <h1 className="text-xl mt-5 p-4 flex justify-center text-black border border-solid border-black rounded-xl w-[7.5rem]">
            <b>{users.medida} ml</b>
          </h1>
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="flex w-[37rem] justify-center items-center h-[4rem] rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => addToCart(users)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-3 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { userApi } from "../api/userApi.js";
import { useCarrito } from "./ContextoNav";
import ModalVerP from "./ModalVerP.jsx";
import "animate.css/animate.min.css";

export default function Cards(props) {
  const [Bebidas, setBebidas] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart, showVerP, closeshowVerP, openshowVerP } = useCarrito();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers(props.tipo);
  }, [props.tipo]);

  async function getUsers(tipo) {
    try {
      const result = await userApi.get(
        tipo === 0
          ? `https://liquors-golden-production.up.railway.app/api/products/liquors`
          : tipo === 5
          ? `https://liquors-golden-production.up.railway.app/api/products/between/category/${5}`
          : `https://liquors-golden-production.up.railway.app/api/products/between/category/${6}`
      );
      console.log(result.data);
      setBebidas(result.data);
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

  function convertir(precio) {
    return precio.toLocaleString("es-CO");
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBebidas = Bebidas.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="-z-10 mt-cart-top transition-opacity animate-aparecer opacity-100">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-1">
        <div className="flex justify-end mb-8">
          <div className="w-full sm:max-w-xs relative">
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
              className="pl-10 px-4 py-2 border rounded-xl bg-black bg-opacity-70 text-white outline-none w-full"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={handleSearchChange}
              required
            />
          </div>
        </div>
        <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-9">
          <ModalVerP
            showModal={showVerP}
            closeModal={closeshowVerP}
            product={selectedProduct}
          ></ModalVerP>

          {Bebidas.length === 0 ? (
            <>
              {
                <div className="flex items-center justify-center col-span-4 h-96 mb-48 rounded-lg">
                  <div className="flex space-x-2 items-center justify-center col-span-4 h-96 mb-48 rounded-lg">
                    <div className="h-8 w-8 bg-letraNavBar rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-8 w-8  bg-letraNavBar rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-8 w-8  bg-letraNavBar rounded-full animate-bounce"></div>
                  </div>
                </div>
              }
            </>
          ) : (
            filteredBebidas.reverse().map((product) => (
              <div key={product.id} className="animate__animated animate__fadeInUp">
                <div
                  key={product.id}
                  className="flex flex-col justify-between bg-white rounded-[1rem] transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105 duration-150"
                >
                  <Link
                    type="submit"
                    onClick={() => {
                      setSelectedProduct(product);
                      console.log(product);
                      openshowVerP();
                    }}
                  >
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 rounded-[1rem] rounded-b-none">
                      {product.discountActive === true ? (
                        <div className="absolute flex justify-center items-center bg-black text-md gap-2 text-white top-10 font-bold px-4 py-2 rounded-tr-lg rounded-br-lg shadow-xl">
                          <span className="relative h-3 w-3 flex justify-center items-center">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-letraNavBar opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-letraNavBar"></span>
                          </span>
                          <h1>OFERTA</h1>
                        </div>
                      ) : (
                        ""
                      )}
                      <img
                        src={product.imageUrl}
                        alt={product.imageUrl}
                        className={`h-full w-full object-cover object-center lg:h-full lg:w-full ${
                          product.stock < 2 ? "grayscale" : ""
                        }`}
                      />
                    </div>
                    <div className="flex justify-start gap-2">
                      {product.discountActive === true ? (
                        <>
                          <h1 className="mt-4 ml-3 text-2xl text-black">
                            <b>${convertir(product.offerPrice)}</b>
                          </h1>
                          <h1 className="mt-4 text-2xl text-red-900">
                            <del>
                              <b>${convertir(product.price)}</b>
                            </del>
                          </h1>
                        </>
                      ) : (
                        <h1 className="mt-4 ml-3 text-2xl text-black">
                          <b>${convertir(product.price)}</b>
                        </h1>
                      )}
                    </div>
                    <h1 className="mt-1.5 ml-3 text-black text-lg">
                      {product.name}
                    </h1>
                  </Link>

                  <div className="flex flex-col justify-between m-3">
                    <h1>
                      <Link>
                        <span aria-hidden="true" className="" />
                        <div className="flex justify-between">
                          <p className="mt-4 text-xl text-black font-bold border rounded-lg px-2 py-1 border-black">
                            {product.proportion.quantity}
                          </p>
                          <div>
                            {product.stock < 2 ? (
                              <h1 className="mt-4 mr-4 text-xl font-bold text-red-600">
                                AGOTADO
                              </h1>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </Link>
                    </h1>
                    <div className="mt-4 flex justify-center">
                      {product.stock > 2 ? (
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={() => addToCart(product)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 mr-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                          </svg>
                          Agregar al carrito
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="cursor-default flex w-full justify-center rounded-md bg-black bg-opacity-30 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 mr-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                          </svg>
                          Producto agotado
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

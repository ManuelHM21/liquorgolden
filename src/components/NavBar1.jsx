import { Fragment, useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { useCarrito } from "./ContextoNav";
import { useMemo } from "react";
import ModalPago from "./ModalPago.jsx";
import "animate.css/animate.min.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const [activeLink, setActiveLink] = useState(null);
  const {
    handleTipoPagoChange,
    tipoDePago,
    setOpen,
    open,
    imagenUsua,
    cartItems,
    removeFromCart,
    calculateSubtotal,
    gestionToken,
    Roll,
    addToCart,
    nombreUsua,
    showPagos,
    closesPagos,
    openshowPagos,
  } = useCarrito();
  const [token, setToken] = useState();

  const deactivateAllLinks = () => {
    setActiveLink(null);
  };

  const Salir = () => {
    gestionToken("public");
    deactivateAllLinks();
  };

  const totalQuantity = useMemo(() => {
    return cartItems.reduce((total, product) => {
      return total + product.quantity;
    }, 0);
  }, [cartItems]);

  const links = {
    USUA: [
      { name: "Ofertas", to: "/ofertas" },
      { name: "Sugeridos", to: "/sugeridos" },
      { name: "Licores", to: "/licores" },
      { name: "Cervezas", to: "/cervezas" },
      { name: "Otros+", to: "/bebidas" },
      { name: "Seguimiento", to: "/visualizacion" },
      {
        icon: (
          <>
            <Link
              onClick={deactivateAllLinks}
              to={"/editar_usuario"}
              type="button"
              className="relative"
            >
              <div as="div" className="flex gap-4 ml-3 mt-1">
                <div className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <img
                    className="h-10 rounded-full border-white"
                    src={imagenUsua}
                    alt=""
                  />
                </div>
                <h1 className="text-gray-400 mt-2 hover:text-white text-sm">
                  {nombreUsua}
                </h1>
              </div>
            </Link>
          </>
        ),
      },
      {
        icon: (
          <button type="button">
            {totalQuantity > 0 && (
              <span className="absolute ml-4 bg-gray-700 bg-opacity-70 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {totalQuantity}
              </span>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
              onClick={() => setOpen(true)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
        ),
      },
      {
        icon: (
          <Link to="/" onClick={Salir}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </Link>
        ),
      },
    ],
    ADMIN: [
      { name: "Editar productos", to: "/editar_licores" },
      { name: "Crear oferta", to: "/crear_oferta" },
      {
        icon: (
          <>
            <Link
              onClick={deactivateAllLinks}
              to={"/editar_admin"}
              type="button"
              className="relative"
            >
              <div as="div" className="flex gap-4 mt-1">
                <div className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <img
                    className="h-10 rounded-full border-white"
                    src={imagenUsua}
                    alt=""
                  />
                </div>
                <h1 className="text-gray-400 mt-2.5 hover:text-white text-sm">
                  {nombreUsua}
                </h1>
              </div>
            </Link>
          </>
        ),
      },
      {
        icon: (
          <Link to="/" onClick={Salir}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </Link>
        ),
      },
    ],
    public: [
      { name: "Ofertas", to: "/ofertas" },
      { name: "Licores", to: "/licores" },
      { name: "Cervezas", to: "/cervezas" },
      { name: "Otros+", to: "/bebidas" },
      {
        name: "Login",
        to: "/login",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        ),
      },
      {
        icon: (
          <button type="button">
            {totalQuantity > 0 && (
              <span className="absolute ml-4 bg-gray-700 bg-opacity-70 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {totalQuantity}
              </span>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
              onClick={() => setOpen(true)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
        ),
      },
    ],
  };

  function convertir(precio) {
    return precio.toLocaleString("es-CO");
  }

  useEffect(() => {
    loguear(Roll);
  }, [Roll]);

  const loguear = (Roll) => {
    setToken(Roll);
  };

  function renderLinks(linkArray) {
    return (
      <div className="block sm:flex space-x-4">
        {linkArray.map((item, index) => {
          if (
            token === "public" &&
            (item.name === "Editar usuario" || item.name === "Editar admin")
          ) {
            return null;
          }
          return (
            <>
              <Link
                key={item.name}
                to={item.to}
                className={classNames(
                  activeLink === index
                    ? "text-letraNavBar text-opacity-60 border-letraNavBar border-b flex gap-2 items-center animate__animated animate__fadeInRight"
                    : "text-letraNavBar flex gap-2 items-center animate__animated animate__fadeInRight",
                  "px-3 py-2 text-xl font-medium transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105 duration-50"
                )}
                onClick={() => setActiveLink(index)}
                
                aria-current={activeLink === index ? "page" : undefined}
              >
                {item.name}
                {item.icon}
              </Link>
            </>
          );
        })}

        {/* Carrito de compras */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md transition-opacity" />
            </Transition.Child>
            <ModalPago
              showModal={showPagos}
              closeModal={closesPagos}
            ></ModalPago>

            <div className="z-10 fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="z-10 pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-scroll bg-black bg-opacity-95 shadow-xl border-l-2">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between">
                            {cartItems.length > 0 ? (
                              <Dialog.Title className="text-2xl font-bold text-letraNavBar">
                                Too lo que te va a tomaa mi papaaaa !!!!!!
                                🍻🥃😎
                              </Dialog.Title>
                            ) : (
                              <Dialog.Title className="text-2xl font-bold text-letraNavBar">
                                Joa llevate asi sea una bolsa de hielo 🧐 Agrega
                                productos+
                              </Dialog.Title>
                            )}

                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="relative -m-2 p-2 text-white hover:text-gray-500"
                                onClick={() => setOpen(false)}
                              >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>

                          <div className="mt-8">
                            <div className="flow-root">
                              <ul className="-my-6 divide-y divide-gray-200">
                                {cartItems.map((product) => (
                                  <li key={product.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={product.imageUrl}
                                        alt={product.imageUrl}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-bold text-white">
                                          <h3>
                                            <a href={product.href}>
                                              {product.name}
                                            </a>
                                          </h3>
                                          <p className="ml-4">
                                            ${convertir(product.price)}
                                          </p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {product.proportion.quantity}
                                        </p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className="flex gap-2 items-center">
                                          <button
                                            onClick={() =>
                                              removeFromCart(product.id)
                                            }
                                            className="text-white hover:text-gray-500"
                                          >
                                            -
                                          </button>
                                          <span className="text-white">
                                            {product.quantity}
                                          </span>
                                          <button
                                            onClick={() => addToCart(product)}
                                            className="text-white hover:text-gray-500"
                                          >
                                            +
                                          </button>
                                        </div>

                                        <div className="flex">
                                          <button
                                            type="button"
                                            className="font-medium p-2 border border-red-800 rounded-xl text-red-800 hover:bg-red-900 hover:text-white"
                                            onClick={() =>
                                              removeFromCart(product.id)
                                            }
                                          >
                                            Eliminar
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                          <div className="flex justify-between text-lg font-bold text-white">
                            <p className="">Subtotal</p>
                            <p>
                              <b className="text-md font-semibold">
                                ${convertir(calculateSubtotal())}
                              </b>
                            </p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            Verifique su compra
                          </p>
                          {cartItems.length > 0 ? (
                            <>
                              <div className="mt-5 flex justify-between ">
                                <div className="text-white font-bold text-lg">
                                  Metodo de pago
                                </div>
                                <select
                                  value={tipoDePago}
                                  onChange={handleTipoPagoChange}
                                  className="font-bold text-white bg-black bg-opacity-60 border border-white rounded-md px-3 py-1"
                                >
                                  <option>Efectivo</option>
                                  <option>Tarjeta</option>
                                </select>
                              </div>

                              <div className="mt-6">
                                <button
                                  onClick={() => {
                                    openshowPagos();
                                  }}
                                  className="flex items-center justify-center w-full rounded-md border border-letraNavBar bg-transparent px-6 py-3 text-lg font-bold text-letraNavBar shadow-sm hover:bg-letraNavBar hover:text-black"
                                >
                                  Pagar
                                </button>
                              </div>
                              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                  <button
                                    type="button"
                                    className="font-medium text-letraNavBar hover:text-letraNavBarHover"
                                    onClick={() => setOpen(false)}
                                  >
                                    Continuar por si A-k
                                    <span aria-hidden="true"> &rarr;</span>
                                  </button>
                                </p>
                              </div>
                            </>
                          ) : (
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                  <button
                                    type="button"
                                    className="font-medium text-letraNavBar hover:text-letraNavBarHover"
                                    onClick={() => setOpen(false)}
                                  >
                                    Ver botella de mil dolares para llevarme 8 💸
                                    <span aria-hidden="true"> &rarr;</span>
                                  </button>
                                </p>
                              </div>
                          )}
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    );
  }

  return (
    <Disclosure
      as="nav"
      className="fixed z-10 top-0 left-0 justify-between sm:h-fit w-full bg-black bg-opacity-95 backdrop-blur-md"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 p-2 transition-opacity animate-aparecer opacity-100">
            <div className="relative flex items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <Link
                    to={"/"}
                    className="transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105 duration-150"
                  >
                    <img
                      onClick={deactivateAllLinks}
                      className="w-16 sm:w-24"
                      src={logo}
                      alt="Your Company"
                    />
                  </Link>
                </div>

                <div className="hidden sm:ml-6 sm:flex items-center transition-opacity animate-aparecer opacity-100">
                  {renderLinks(links[token] || [])}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {renderLinks(links[token] || [])}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

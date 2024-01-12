import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useCarrito } from "./ContextoNav";

const Modal = ({ showModal, closeModal, product }) => {
  const cancelButton = useRef(null);
  const { addToCart, convertir } = useCarrito();

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButton}
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-lg transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="bg-black bg-opacity-50 border-[0.1px] border-white relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:h-full sm:max-w-5xl">
                <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:gap-x-9 text-white">
                    <div className="shadow-inner aspect-h-1 aspect-w-1 overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 rounded-[1rem]">
                    {product && product.discountActive === true ? (
                        <div className="absolute flex justify-center items-center bg-black text-xl gap-2 text-white top-20 font-bold px-4 py-2 rounded-tr-xl rounded-br-xl shadow-xl">
                          <h1>OFERTA</h1>
                        </div>
                      ) : (
                        ""
                      )}
                      <img
                        src={product && product.imageUrl}
                        alt={product && product.name}
                        className="h-full w-sm object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between">
                          <h1 className="text-2xl sm:text-4xl">
                            <b>{product && product.name}</b>
                          </h1>
                          <div className=" flex justify-end">
                            <button
                              onClick={closeModal}
                              className="modal-close cursor-pointer transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105 duration-50"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="white"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <h1 className="text-lg mt-2">
                          {product && product.description}
                        </h1>
                      </div>

                      <div>
                        <div className="flex">
                          <h3 className="mt-1 text-2xl sm:text-4xl text-white">
                            $ {convertir(product && product.price)}
                          </h3>
                        </div>
                        <h1 className="text-xl mt-5 p-2 flex justify-center text-white border border-solid border-white rounded-xl w-[7.5rem]">
                          <b>{product && product.proportion.quantity}</b>
                        </h1>
                        <div className="mt-4 flex justify-center">
                        {product && product.stock > 2 ? (
                          <button
                            type="submit"
                            className="flex w-full justify-center items-center rounded-md bg-white px-3 py-2 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => addToCart(product)}
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
                      ) : (
                        <button
                            type="submit"
                            className="flex w-full justify-center items-center rounded-md bg-white bg-opacity-40 px-3 py-2 text-sm font-semibold leading-6 text-black shadow-sm cursor-default"
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
                            Producto agotado
                          </button>
                      )}                       
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;

import { Dialog, Transition } from "@headlessui/react";
import { useLicores } from "./ProductosContext";
import { Fragment } from "react";

//const cancelButtonRef = useRef(null);
const Modal = ({ showModal, closeModal }) => {
  const {
    quantity,
    name,
    stock,
    price,
    setquantity,
    crearOferta,
    imageUrl,
    cancelarEstado
  } = useLicores();

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        //initialFocus={cancelButtonRef}
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="bg-black bg-opacity-50 border-[0.1px] border-white relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex-col sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"></div>
                    <div className="mb-12 flex justify-between rounded-t border-b">
                      <h1 className="flex text-3xl font-semibold mb-4 text-white">
                        Modificar
                      </h1>
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
                    <form className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                      <div className="flex justify-center items-center mb-2 col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-3">
                        <img
                          src={imageUrl}
                          alt={imageUrl}
                          className={`w-44 object-cover object-center`}
                        />
                      </div>

                      {/* NOMBRE */}
                      <div className="mb-2 col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-3">
                        <label className="text-white font-bold">Nombre:</label>
                        <input
                          type="text"
                          className="cursor-not-allowed w-full p-2 border border-white text-white rounded-md focus:outline-none bg-black bg-opacity-60"
                          id="nameProduct"
                          name="nameProduct"
                          placeholder="Old pa...."
                          autoComplete="off"
                          value={name}
                          disabled
                        />
                      </div>

                      {/* PRECIO */}
                      <div className="mb-4">
                        <label className="text-white mb-2 font-bold">
                          Precio:
                        </label>
                        <div className="relative">
                          <input
                            className="cursor-not-allowed w-full pl-10 pr-4 py-2 p-2 border border-white text-white rounded-md focus:outline-none bg-black bg-opacity-60"
                            id="price"
                            name="price"
                            aria-describedby="inputGroupPrepend"
                            placeholder="00000"
                            autoComplete="off"
                            value={price}
                            disabled
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500" aria-hidden="true">
                              $
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* STOCK */}
                      <div className="mb-2 col-span-1">
                        <label className="text-white font-bold">stock:</label>
                        <input
                          type="text"
                          className="cursor-not-allowed w-full p-2 border border-white text-white rounded-md focus:outline-none bg-black bg-opacity-60"
                          id="stock"
                          name="stock"
                          placeholder="Old pa...."
                          autoComplete="off"
                          value={stock}
                          disabled
                        />
                      </div>

                      {/* Oferta */}
                      <div className="mb-2 col-span-1">
                      <div className="flex items-center gap-3">
                        <label className="text-white font-bold">Oferta:</label>
                        <span className="relative h-3 w-3 flex justify-center items-center">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-700 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-700"></span>
                          </span>
                      </div>
                        
                        <input
                          type="number"
                          className="w-full p-2 border border-white text-white rounded-md focus:outline-none bg-black bg-opacity-60"
                          id="quantity"
                          name="quantity"
                          placeholder="18%"
                          onChange={(e) => setquantity(e.target.value)}
                          value={quantity}
                          required
                        />
                      </div>

                      <div className="flex w-full col-span-3 items-center transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105 duration-50">
                        <button
                          type="submit"
                          className="w-full font-bold flex justify-center bg-transparent text-center items-center hover:bg-blue-700 hover:text-white text-blue-700 border border-blue-700 rounded-xl focus:outline-none px-2 py-4"

                          onClick={(e) => {
                            crearOferta(e);
                            closeModal();
                            }
                          }

                        ><div className="flex justify-center items-center">
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
                          <h1>Ofertar</h1>
                        </div>
                        </button>
                      </div>
                    </form>
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

import { useLicores } from "./ProductosContext";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Modal = ({ showModal, closeModal }) => {
  const cancelButtonRef = useRef(null);
  const {
    handleMedidaChange,
    selectedMedida,
    handleCategoriaChange,
    selectedCategoria,
    GcategoryId,
    tipo,
    imageUrl,
    nameProduct,
    price,
    stock,
    description,
    setimageUrl,
    setnameProduct,
    setdescription,
    setprice,
    setstock,
    proportionId,
    agregarLicor,
  } = useLicores();

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
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
                        Agregar productos
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
                      {/* NOMBRE */}
                      <div className="mb-2 col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-3">
                        <label className="text-white font-bold">Nombre:</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-white text-white rounded-md focus:outline-none bg-black bg-opacity-60"
                          id="nameProduct"
                          name="nameProduct"
                          placeholder="Old pa...."
                          autoComplete="off"
                          onChange={(e) => setnameProduct(e.target.value)}
                          value={nameProduct}
                          required
                        />
                      </div>

                      {/* DESCRIPCION */}
                      <div className="mb-4 col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-3">
                        <label className="text-white mb-2 font-bold">
                          Descripcion:
                        </label>
                        <textarea
                          id="description"
                          rows="2"
                          className="block w-full p-2 border border-white text-white rounded-md focus:outline-none bg-black bg-opacity-60"
                          placeholder="Agrega una descripcion"
                          onChange={(e) => setdescription(e.target.value)}
                          value={description}
                          required
                        ></textarea>
                      </div>

                      {/* PRECIO */}
                      <div className="mb-4">
                        <label className="text-white mb-2 font-bold">
                          Precio:
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            className="w-full pl-10 pr-4 py-2 p-2 border border-white text-white rounded-md focus:outline-none bg-black bg-opacity-60"
                            id="price"
                            name="price"
                            aria-describedby="inputGroupPrepend"
                            placeholder="00000"
                            autoComplete="off"
                            onChange={(e) => setprice(e.target.value)}
                            value={price}
                            required
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500" aria-hidden="true">
                              $
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="text-white mb-2 font-bold">
                          Cant:
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border border-white text-white rounded-md focus:outline-none bg-black bg-opacity-60"
                          id="cantidad"
                          name="Cantidad"
                          placeholder="2"
                          autoComplete="off"
                          onChange={(e) => setstock(e.target.value)}
                          value={stock}
                          required
                        />
                      </div>

                      {/* IMAGEN */}
                      <div className="mb-2">
                        <label className="text-white font-bold">
                          Imagen URL:
                        </label>
                        <input
                          type="url"
                          className="w-full p-2 border border-white text-white rounded-md focus:outline-none bg-black bg-opacity-60"
                          id="nameProduct"
                          name="nameProduct"
                          placeholder="https://encrypted....."
                          autoComplete="off"
                          onChange={(e) => setimageUrl(e.target.value)}
                          value={imageUrl}
                          required
                        />
                      </div>

                      {/* MEDIDA */}
                      <div className="mb-2">
                        <label className="text-white font-bold">Medida:</label>
                        <div className="relative flex w-full">
                          <select
                            value={selectedMedida}
                            onChange={handleMedidaChange}
                            className="w-full text-white bg-black bg-opacity-60 outline-none font-medium rounded-lg text-start inline-flex items-center border border-white px-1 py-2"
                          >
                            <option>Elija la medida...</option>
                            {proportionId.map((propo) => (
                              <option key={propo.id} value={propo.id}>
                                {propo.quantity}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="mb-2">
                        <label className="text-white font-bold">
                          Categoria:
                        </label>
                        <div className="relative flex w-full">
                          <select
                            value={selectedCategoria}
                            onChange={handleCategoriaChange}
                            className="w-full text-white bg-black bg-opacity-60 outline-none font-medium rounded-lg text-start inline-flex items-center border border-white px-1 py-2"
                          >
                            <option>Elija la categoria...</option>
                            {GcategoryId.map((categoria) => (
                              <option key={categoria.id} value={categoria.id}>
                                {categoria.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-center items-center transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105 duration-50">
                        <button
                          type="submit"
                          className="font-bold flex bg-transparent hover:bg-green-400 hover:text-black text-green-400 border border-green-400 rounded-xl focus:outline-none px-2 py-4"
                          onClick={(e) => agregarLicor(e)}
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
                          Agregar{" " + tipo}
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

import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useCarrito } from "./ContextoNav";

const Modal = ({ showModal, closeModal }) => {
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
              <Dialog.Panel className="bg-black bg-opacity-50 border-[0.1px] border-white relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:h-full sm:max-w-2xl">
                <div className="bg-white flex items-center justify-center">
                  <div
                    className="w-full mx-auto rounded-lg shadow-lg p-5 text-gray-700"
                  >
                    <div className="flex justify-between mb-10">
                      <h1 className="text-center font-bold text-xl uppercase">
                        Información de pago segura
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
                                stroke="black"
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
                    <div className="mb-3 flex -mx-2">
                      <div className="px-2">
                        <label
                          htmlFor="type1"
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            className="form-radio h-5 w-5 text-black"
                            name="type"
                            id="type1"
                            checked
                          />
                          <img
                            src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                            className="h-8 ml-3"
                            alt="Tarjeta Visa"
                          />
                        </label>
                      </div>
                      <div className="px-2">
                        <label
                          htmlFor="type2"
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            className="form-radio h-5 w-5 text-black"
                            name="type"
                            id="type2"
                          />
                          <img
                            src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png"
                            className="h-8 ml-3"
                            alt="Tarjeta PayPal"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="font-bold text-sm mb-2 ml-1">
                        Nombre en la tarjeta
                      </label>
                      <div>
                        <input
                          className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-black transition-colors"
                          placeholder="John Smith"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="font-bold text-sm mb-2 ml-1">
                        Número de tarjeta
                      </label>
                      <div>
                        <input
                          className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-black transition-colors"
                          placeholder="0000 0000 0000 0000"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="mb-3 -mx-2 flex items-end">
                      <div className="px-2 w-1/2">
                        <label className="font-bold text-sm mb-2 ml-1">
                          Fecha de vencimiento
                        </label>
                        <div>
                          <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-black transition-colors cursor-pointer">
                            <option value="01">01 - Enero</option>
                            <option value="02">02 - Febrero</option>
                            <option value="03">03 - Marzo</option>
                            <option value="04">04 - Abril</option>
                            <option value="05">05 - Mayo</option>
                            <option value="06">06 - Junio</option>
                            <option value="07">07 - Julio</option>
                            <option value="08">08 - Agosto</option>
                            <option value="09">09 - Septiembre</option>
                            <option value="10">10 - Octubre</option>
                            <option value="11">11 - Noviembre</option>
                            <option value="12">12 - Diciembre</option>
                          </select>
                        </div>
                      </div>
                      <div className="px-2 w-1/2">
                        <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-black transition-colors cursor-pointer">
                          <option value="2020">2020</option>
                          <option value="2021">2021</option>
                          <option value="2022">2022</option>
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                          <option value="2029">2029</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-10">
                      <label className="font-bold text-sm mb-2 ml-1">
                        Código de seguridad
                      </label>
                      <div>
                        <input
                          className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-black transition-colors"
                          placeholder="000"
                          type="text"
                        />
                      </div>
                    </div>
                    <div>
                      <button className="font-bold block w-full max-w-xs mx-auto bg-letraNavBar hover:bg-opacity-50 focus:bg-white text-black border border-black rounded-lg px-3 py-3">
                        <i className="mdi mdi-lock-outline mr-1"></i> PAGAR
                        AHORA
                      </button>
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

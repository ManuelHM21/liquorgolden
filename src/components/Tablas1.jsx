import React from "react";
import { useLicores } from "./ProductosContext";
import ModalCrear2 from "./ModalCrearProductos2";
import ModalModificar from "./ModalModificarProductos";

const Table = () => {
  const {
        showModalCrear,
        openModalCrear,
        closeModalCrear,
        showModalModificar,
        closeModalModificar,
        filteredData,
        filter,
        setFilter,
        convertir,
        eliminarLicor,
        activarModificacion,
        // handleImageUpload,
        // uploadImage,
  } = useLicores();

  return (
    <div className="gap-4 transition-opacity animate-aparecer opacity-100">
      <div className="transition-opacity animate-aparecer opacity-100">
        <div className="grow flex justify-between p-5">
          <div>
            <h1 className="text-white grow flex justify-center text-4xl ">
              <b>Gestion todos los productos</b>
            </h1>
          </div>
          <div>
      {/* <input type="file" onChange={(e)=>(console.log(e.target.files[0]))} name="file"/>
      <input type="file" onChange={handleImageUpload} name="file"/>
      <button className="text-white" onClick={uploadImage}>Cargar Imagen</button> */}
    </div>
          <div className="flex justify-between gap-10">
            <div>
              <div className="flex justify-center items-center transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105 duration-50">
                <button
                  type="submit"
                  className="font-bold flex bg-transparent hover:bg-green-400 hover:text-black text-green-400 border border-green-400 rounded-xl focus:outline-none px-3 py-2"
                  onClick={openModalCrear}
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
                  Agregar producto
                </button>
              </div>
              <ModalModificar showModal={showModalModificar} closeModal={closeModalModificar} />
              <ModalCrear2 showModal={showModalCrear} closeModal={closeModalCrear}></ModalCrear2>
              
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
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
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
                  <b>Precio</b>
                </th>
                <th className="text-start">
                  <b>Estado</b>
                </th>
                <th colSpan="2 ">
                  <b>Accion</b>
                </th>
              </tr>
            </thead>
            <tbody className="transition-opacity animate-aparecer opacity-100">
              {filteredData.reverse().map((item) => (
                <tr key={item.id} className={`animate__animated animate__fadeIn w-[8rem] border-b`}>
                  <td className="text-center">
                    <b>{item.id}</b>
                  </td>
                  <td className=" flex tems-center justify-center">
                    <img
                      className={`w-[5rem] ${item.cantidad<2? "grayscale":""}`}
                      src={item.imageUrl}
                      alt={`Imagen de ${item.name}`}
                    />
                  </td>
                  <td className="text-start">
                    {item.name}
                  </td>
                  <td className="text-start">
                    {item.proportion.quantity}<b></b>
                  </td>
                  <td className="text-start">
                    {item.stock}
                  </td>
                  <td className="text-start">
                    <b>$</b>
                    {convertir(item.price)}
                  </td>
                  <td className="text-start">
                    {item.stock<2? (
                      <h1 className="rounded-md w-fit px-2 bg-[#540b0e] bg-opacity-80">
                        <p className="text-sm text-center">Agotado</p>
                      </h1>
                    ):(
                      <h1 className="rounded-md w-fit px-3 bg-[#31572c] bg-opacity-80 ">
                        <p className="text-sm text-center">Stock</p>
                      </h1>
                    )}
                  </td>
                  <td className="text-center">
                    <button
                      type="submit"
                      className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-blue-500 shadow-sm hover:bg-blue-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105 duration-50"
                      onClick={() => activarModificacion(item.id)}
                    >
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      type="submit"
                      className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-red-700 shadow-sm hover:bg-red-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105 duration-50"
                      onClick={() => eliminarLicor(item.id)}
                    >
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
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

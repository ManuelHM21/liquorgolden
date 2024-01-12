import React, { useState } from 'react';

const ProgresoPasos = () => {
  const [progreso, setProgreso] = useState(1);

  const avanzarPaso = () => {
    if (progreso < 4) {
      setProgreso(progreso + 1);
    }
  };

  const retrocederPaso = () => {
    if (progreso > 1) {
      setProgreso(progreso - 1);
    }
  };

  return (
    <div className='mx-10 flex flex-col justify-center'>
      <ol className="my-36 flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
        <li className={`flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:${progreso >= 1 ? 'inline-block' : 'hidden'} after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span className="hidden sm:inline-flex sm:ms-2">Recibido</span>
          </span>
        </li>
        <li className={`flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-red-600 after:border-1 after:${progreso >= 2 ? 'after:border-red-600 inline-block  text-blue-600 dark:text-blue-500' : 'hidden'}  after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <span className="me-2">2</span>
            <span className="hidden sm:inline-flex sm:ms-2">Preparacion</span>
          </span>
        </li>
        <li className={`flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-red-600 after:border-4 after:${progreso >= 3 ? 'after:border-red-600 inline-block text-blue-600 dark:text-blue-500' : 'hidden'}  after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
          <span className="me-2">3</span>
          Domiciliario
        </li>
        <li className={`flex items-center  after:${progreso >= 4 ? 'inline-block text-blue-600 dark:text-blue-500 after:border-red-600' : 'hidden'} `}>
          <span className="me-2">4</span>
          Entregado
        </li>
      </ol>

      <div className="mt-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md mr-2" onClick={retrocederPaso}>
          Retroceder
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={avanzarPaso}>
          Avanzar
        </button>
      </div>
    </div>
  );
};

export default ProgresoPasos;

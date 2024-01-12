import React from "react";
import { ProductosContext } from "../../components/ProductosContext";
import Tablas from "../../components/TablaCrearOferta";

export default function CrearOferta() {
  return (
    <ProductosContext>
      <div className="mt-36 container mx-auto bg-black bg-opacity-70 rounded-3xl">
        <div className="container mx-auto">
          <Tablas/>
        </div>
      </div>
    </ProductosContext>
  );
}

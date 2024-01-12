import React from "react";
import { ProductosContext } from "../../components/ProductosContext";
import Tablas from "../../components/Tablas1";

export default function EditLicores() {
  return (
    <div className="mt-36 container mx-auto bg-black bg-opacity-70 rounded-3xl">
    <ProductosContext tipo="bebidas">
       <div className="container mx-auto">
          <Tablas/>
        </div>
    </ProductosContext>
       
    </div>
  );
}

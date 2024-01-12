import React from "react";
import { ProductosContext } from "../../components/ProductosContext";
import Table from "../../components/Tablas1";

export default function EditLicores() {
  return (
    <ProductosContext tipo={1}>
      <div className="mt-36 container mx-auto bg-black bg-opacity-70 rounded-3xl h-[630px]">
        <div className="container mx-auto">
          <Table/>
        </div>
      </div>
    </ProductosContext>
  );
}

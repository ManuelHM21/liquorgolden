import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Login1";
import NavBar1 from "../components/NavBar1";
import Bebidas from "../Pages/Bebidas";
import Cervezas from "../Pages/Cervezas";
import Home from "../Pages/Home";
import Licores from "../Pages/Licores";
import Ofertas from "../Pages/Ofertas";
import ProRouterAdmin from "./ProRouterAdmin";
import ProRouterUsua from "./ProRouterUsua";
import EditarUsua from "../Pages/Ususario/EditarUsua";
import HomeAdmin from "../Pages/Admin/HomeAdmin";
import EditarAdmin from "../Pages/Admin/EditarAdmin";
import HomeUsua from "../Pages/Ususario/HomeUsua";
import EditLicores from "../Pages/Admin/EditLicores";
import CrearOferta from "../Pages/Admin/CrearOferta";
import RegistrarseUsua from "../components/RegistrarseUsua";
import Footer from "../components/Footer";
import ModalIngreso from "../components/Modal_Ingreso";
import Step from "../components/Step";
import EnMantenimiento from "../components/EnMantenimiento";
import { ContextoProvider } from "../components/ContextoNav";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <ContextoProvider>
          <NavBar1 />
          <ModalIngreso></ModalIngreso>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/licores" element={<Licores />} />
            <Route path="/cervezas" element={<Cervezas />} />
            <Route path="/bebidas" element={<Bebidas />} />
            <Route element={<ProRouterAdmin />}>
              <Route path="/home_admin" element={<HomeAdmin />} />
              <Route path="/editar_admin" element={<EnMantenimiento />} />
              <Route path="/editar_licores" element={<EditLicores />} />
              <Route path="/crear_oferta" element={<CrearOferta />} />
            </Route>
            <Route element={<ProRouterUsua />}>
              <Route path="/sugeridos" element={<EnMantenimiento />} />
              <Route path="/visualizacion" element={<EnMantenimiento />} />
              <Route path="/home_usuario" element={<HomeUsua />} />
              <Route path="/editar_usuario" element={<EnMantenimiento />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/registrarse" element={<RegistrarseUsua />} />
          </Routes>
        </ContextoProvider>

        <Footer></Footer>
      </BrowserRouter>
    </>
  );
};

export default Router;

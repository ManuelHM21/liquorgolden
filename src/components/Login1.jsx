import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "./Slider";
import { userApi } from "../api/userApi";
import Swal from "sweetalert2";
import { useCarrito } from "./ContextoNav";
import "animate.css/animate.min.css";


const LoginPage = () => {
  const { gestionToken,setnombreUsua ,setimagenUsua} = useCarrito();
  const [usuario, setusuario] = useState();
  const [contraseña, setcontraseña] = useState();
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setusuario(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setcontraseña(event.target.value);
  };

  async function getUsers(e) {
    try {
        e.preventDefault();
      const result = await userApi.get(
        `https://liquors-login-back-production.up.railway.app/usuarios/${usuario}/${contraseña}`
      );
      console.log(result.data);
      gestionToken(result.data.role);
      setnombreUsua(result.data.name);
      setimagenUsua(result.data.imgUrl) 
      navigate("/");
    } catch (error) {
        setusuario("");
        setcontraseña("");
        Swal.fire({
            title: "QUIEN SOS VOS!!?? 😡",
            text: usuario,
            icon: "error",
            background: "rgba(0, 0, 0, 0.969)",
            color: "#fff",
            confirmButtonColor: "#003049",
          });  
    }
  }

  return (
    <>
      <section className="min-h-screen flex items-stretch text-white">
        <div
          className="lg:flex w-1/2 hidden bg-no-repeat bg-cover relative items-center animate__animated animate__fadeInLeft"
          style={{
            backgroundImage:
              "url(https://i.pinimg.com/564x/db/2d/55/db2d55a8f02d521e634beb3e1cef6587.jpg)",
          }}
        >
          <div className="absolute bg-black opacity-70 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">
              Liquos Golden
            </h1>
            <p className="italic text-3xl my-4 font-extralight">
              Explorando la esencia de la bebida, una botella a la vez
            </p>
          </div>
          <div className="bottom-0 absolute text-center right-0 left-0 flex justify-center">
            <Slider></Slider>
          </div>
        </div>
        <div className="animate__animated animate__fadeInRight lg:w-1/2 w-full flex items-center justify-center text-start bg-gradient-to-r backdrop-blur-lg">
          <div className="w-full p-8">
            <h2 className="flex justify-center text-5xl mb-20 text-white font-semibold">
              Login
            </h2>
            <div className="mt-6">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-white block"
                  >
                    Email Address
                  </label>
                  <input
                    value={usuario}
                    onChange={handleEmailChange}
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 p-3 w-full rounded-md text-white focus:outline-none bg-black bg-opacity-70 border border-white backdrop-blur-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-white block"
                  >
                    Password
                  </label>
                  <input
                    value={contraseña}
                    onChange={handlePasswordChange}
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="mt-1 p-3 w-full rounded-md bg-black bg-opacity-70 border border-white backdrop-blur-lg text-white focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link to="#" className="text-letraNavBar hover:underline">
                      Papa que? se te olvido la contraseña?
                    </Link>
                  </div>
                </div>
                <div>
                  <button
                    onClick={getUsers}
                    className="mt-8 w-full p-3 bg-white rounded-md text-black font-bold hover:bg-opacity-60 focus:outline-none focus:ring focus:border-purple-500"
                  >
                    Ingresar
                  </button>
                </div>
              </form>
              <p className="mt-4 text-sm">
                ¿No tienes una cuenta?, llega mi hermanito Registrate aquí.{" "}
                <Link to="/registrarse" className="text-letraNavBar hover:underline">
                  Crear cuenta
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;

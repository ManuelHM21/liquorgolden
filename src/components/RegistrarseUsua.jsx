import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "./Slider";
import { userApi } from "../api/userApi";
import Swal from "sweetalert2";
import "animate.css/animate.min.css";

const LoginPage = () => {
  const [name, setname] = useState();
  const [password, setpassword] = useState();
  const [lastName, setlastName] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [imgUrl, setimgUrl] = useState();

  const navigate = useNavigate();

  // email
  const handleEmailChange = (event) => {
    setemail(event.target.value);
  };

  // contraseña
  const handlePasswordChange = (event) => {
    setpassword(event.target.value);
  };

  // name
  const handleNameChange = (event) => {
    setname(event.target.value);
  };

  // lasName
  const handlelastNameChange = (event) => {
    setlastName(event.target.value);
  };

  // phone
  const handlePhoneChange = (event) => {
    setphone(event.target.value);
  };

  // imagen
  const handlelastimgUrlChange = (event) => {
    setimgUrl(event.target.value);
  };

  async function getUsers(e) {
    try {
      e.preventDefault();
      const result = await userApi.post(
        `https://liquors-login-back-production.up.railway.app/usuarios/`,
        {
          password,
          name,
          lastName,
          email,
          phone,
          age: "21",
          imgUrl,
          role: "USUA",
        }
      );
      Swal.fire({
        title: "Confirma el token que le enviamos al correo",
        text: `Recuerda que si no activas el usuario ${email} no podras ingresar`,
        icon: "info",
        background: "rgba(0, 0, 0, 0.969)",
        color: "#fff",
        confirmButtonColor: "#003049",
      });
      console.log(result.data);
      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: "Error al registrarse",
        text: name,
        icon: "error",
        background: "rgba(0, 0, 0, 0.969)",
        color: "#fff",
        confirmButtonColor: "#003049",
      });
    }
  }

  return (
    <>
      <section className="min-h-screen flex items-stretch text-white mt-16 lg:mt-0">
        <div
          className="lg:flex w-1/2 hidden bg-no-repeat bg-cover relative items-center animate__animated animate__fadeInLeft"
          style={{
            backgroundImage:
              "url(https://i.pinimg.com/564x/93/59/d9/9359d9488dbce3d984e67e40bfca5d5f.jpg)",
          }}
        >
          <div className="absolute bg-black opacity-70 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">
              Liquos Golden te invita a ser cliente VIP
            </h1>
            <p className="text-3xl my-4 font-extralight">
              Crea una cuenta que te identifique y descubre los beneficios
            </p>
          </div>
          <div className="bottom-0 absolute text-center right-0 left-0 flex justify-center">
            <Slider></Slider>
          </div>
        </div>
        <div className="animate__animated animate__fadeInRight lg:w-1/2 w-full flex items-center justify-center text-start bg-gradient-to-r backdrop-blur-lg">
          <div className="w-full p-8">
            <h2 className="flex justify-center text-5xl mb-20 text-white font-semibold">
              Registro de usuario
            </h2>
            <div className="mt-6">
              <form className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="col-span-2 lg:col-span-1">
                  <label
                    htmlFor="Nombre"
                    className="text-sm font-medium text-white block"
                  >
                    Nombre
                  </label>
                  <input
                    value={name}
                    onChange={handleNameChange}
                    id="name"
                    type="text"
                    required
                    className="mt-1 p-3 w-full rounded-md text-white focus:outline-none bg-black bg-opacity-70 border border-white backdrop-blur-lg"
                  />
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <label
                    htmlFor="Apellido"
                    className="text-sm font-medium text-white block"
                  >
                    Apellido
                  </label>
                  <input
                    value={lastName}
                    onChange={handlelastNameChange}
                    id="lastName"
                    type="text"
                    required
                    className="mt-1 p-3 w-full rounded-md bg-black bg-opacity-70 border border-white backdrop-blur-lg text-white focus:outline-none"
                  />
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <label
                    htmlFor="telefonico"
                    className="text-sm font-medium text-white block"
                  >
                    Numero telefonico de contacto
                  </label>
                  <input
                    value={phone}
                    onChange={handlePhoneChange}
                    id="telefonico"
                    type="number"
                    required
                    className="mt-1 p-3 w-full rounded-md bg-black bg-opacity-70 border border-white backdrop-blur-lg text-white focus:outline-none"
                  />
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <label
                    htmlFor="Foto"
                    className="text-sm font-medium text-white block"
                  >
                    Foto de perfi (URL)
                  </label>
                  <input
                    value={imgUrl}
                    onChange={handlelastimgUrlChange}
                    id="Foto"
                    type="url"
                    className="mt-1 p-3 w-full rounded-md bg-black bg-opacity-70 border border-white backdrop-blur-lg text-white focus:outline-none"
                  />
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <label
                    htmlFor="Correo"
                    className="text-sm font-medium text-white block"
                  >
                    Correo existente
                  </label>
                  <input
                    value={email}
                    onChange={handleEmailChange}
                    id="email"
                    type="email"
                    required
                    className="mt-1 p-3 w-full rounded-md bg-black bg-opacity-70 border border-white backdrop-blur-lg text-white focus:outline-none"
                  />
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-white block"
                  >
                    Contraseña
                  </label>
                  <input
                    value={password}
                    onChange={handlePasswordChange}
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="mt-1 p-3 w-full rounded-md bg-black bg-opacity-70 border border-white backdrop-blur-lg text-white focus:outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <button
                    onClick={getUsers}
                    className=" mt-8 w-full p-3 bg-white rounded-md text-black font-bold hover:bg-opacity-60 focus:outline-none focus:ring focus:border-purple-500"
                  >
                    Registrarse
                  </button>
                </div>
              </form>
              <p className="mt-4 text-sm">
                Si ya tienes cuenta llegate acá.{" "}
                <Link to="/login" className="text-letraNavBar hover:underline">
                  Iniciar sesion
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

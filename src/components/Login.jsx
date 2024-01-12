import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../api/userApi.js";
import Swal from "sweetalert2";
import { useCarrito } from "./ContextoNav";

export default function Login() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Alerta, setAlerta] = useState();
  const navigate = useNavigate();
  const {gestionToken} = useCarrito();

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const result = await userApi.get("https://liquors-login-back-production.up.railway.app/usuarios/ismaeltrocha@gmail.com/1234");
      setUsers(result.data);
    } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error en el servidor",
          background: "rgba(0, 0, 0, 0.969)",
          color: "#fff",
          confirmButtonColor: "#003049",
        });
    }
  }

  
  function CargarUser(e) {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9_@.]{6,}$/;

    if (
      !username||
      !password
    ) {
      Swal.fire({
        icon: "error",
        title: "Todos los campos son obligatorios 🧐",
        background: "rgba(0, 0, 0, 0.969)",
        color: "#fff",
        confirmButtonColor: "#003049",
      });
      return;
    } else {
      users.map((user) =>
      user.username === username &&
      user.contraseña === password &&
      regex.test(username)
        ? (
          localStorage.setItem("id", user.id),
          localStorage.setItem("Nombre", user.nombre),
          localStorage.setItem("Avatar", user.img),
          gestionToken("admin"),
          navigate("/"))
        : (setAlerta(true))
    );
    }
  }
  const Limpiar = async () => {
    setUsername("");
    setPassword("");
  };

  const Registrarse = async () => {
    navigate("/registrarse")
  };

  if (Alerta) {
    Swal.fire({
      title: "QUIEN SOS VOS!!?? 😡",
      text: username,
      icon: "error",
      background: "rgba(0, 0, 0, 0.969)",
      color: "#fff",
      confirmButtonColor: "#003049",
    });
    Limpiar();
    setAlerta(false);
  }

  return (
    <>
      <div className="mt-[11%] mb-20 py-4 border bg-black bg-opacity-50 backdrop-blur-md rounded-[13%] transition-opacity animate-aparecer opacity-100 mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-1 lg:w-[45%]">
        <div className="p-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 xl:gap-x-9">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h1 className="text-5xl text-white">Login</h1>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium leading-6 text-white"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="bg-black bg-opacity-50 block w-full rounded-md border-1 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 focus:outline-white"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-lg font-medium leading-6 text-white"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-black bg-opacity-50 block w-full rounded-md border-0 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 focus:outline-white"
                    />
                  </div>
                </div>
                <div className="pt-8 transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105 duration-50">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-letraNavBar bg-opacity-60 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-letraNavBarHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:to-black"
                    onClick={CargarUser}
                  >
                    Ingresar
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="ml-2 w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </div>
              </form>
              <div className="pt-4 transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105 duration-50">
                  <button
                    onClick={Registrarse}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-letraNavBar bg-opacity-80 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-letraNavBarHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:to-black"
                  >
                    Registrarse
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="ml-2 w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                      />
                    </svg>
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

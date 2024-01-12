import { Navigate, Outlet } from "react-router-dom"
import Swal from "sweetalert2";
import { useCarrito } from "../components/ContextoNav";


const ProRouterIngreso = () => {
  const {isModalOpen} = useCarrito();

  let isLogget = isModalOpen

    if(isLogget!=="ADMIN"){
      Swal.fire({
        icon: "error",
        title: "Identificate Per#¢∞¢#😡U",
        background: "rgba(0, 0, 0, 0.969)",
        color: "#fff",
        confirmButtonColor: "#003049",
      });
      return <Navigate to="/login"/>
    }

  return (
    <Outlet/>
  )
}

export default ProRouterIngreso

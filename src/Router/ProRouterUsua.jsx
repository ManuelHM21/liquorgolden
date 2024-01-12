import { Navigate, Outlet } from "react-router-dom"
import Swal from "sweetalert2";
import { useCarrito } from "../components/ContextoNav";


const ProRouterUsua = () => {
  const {Roll} = useCarrito();

  let isLogget = Roll

    if(isLogget!=="USUA"){
      Swal.fire({
        icon: "error",
        title: "Identificate Per#¢∞¢#😡",
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

export default ProRouterUsua

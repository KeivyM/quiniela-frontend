import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import { AuthContext } from "../context";
import { CarouselQuinielas } from "../components";
import { AxiosConfig } from "../utils";
import Swal from "sweetalert2";

export const Dashboard = () => {
  const { setUserAuth, username, points, userAuth } = useContext(AuthContext);
  let navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("user_Auth");
    setUserAuth(false);
    navigate("/home");
  };

  const deleteCount = async () => {
    const { value: password } = await Swal.fire({
      title: "Tu contraseña es requeridas",
      input: "password",
      html: `Ésta accion no se puede deshacer!`,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      inputPlaceholder: "Contraseña",
      // icon: "warning",
      inputAttributes: {
        maxlength: 10,
        autocapitalize: "off",
        autocorrect: "off",
      },
    });

    if (password) {
      const TOKEN = userAuth;

      const res = await AxiosConfig.get("auth/private", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      const userId = res.data.user._id;

      const Respuesta = await AxiosConfig.post(`auth/${userId}`, {
        password,
      });

      if (Respuesta.data.length < 2)
        return Swal.fire(
          "Contraseña Incorrecta",
          "Intentalo de nuevo",
          "error"
        );

      localStorage.removeItem("user_Auth");
      setUserAuth(false);
      navigate("/home");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          height: "100vh",
          width: "200px",
          padding: "10px",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <Button variant="contained" onClick={Logout}>
          Cerrar sesion
        </Button>
        <Avatar
          sx={{
            bgcolor: "#ca1",
            margin: "0 auto",
            width: "100px",
            height: "100px",
            fontSize: "70px",
          }}
          alt={username}
          src="https://assets.stickpng.com/images/585e4bf3cb11b227491c339a..png"
        />
        <h2>{username}</h2>
        <strong>{points} pts.</strong>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://digitalhub.fifa.com/m/6ebdb10c5731c32/original/FWC-2022-Match-Schedule-ES.pdf"
        >
          Calendario
        </a>
        <Button variant="contained" onClick={deleteCount}>
          Eliminar Cuenta
        </Button>
      </div>
      <div style={{ background: "#ced", width: "100%" }}>
        <CarouselQuinielas />
      </div>
      <hr />
    </div>
  );
};

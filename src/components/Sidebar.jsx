import { Avatar, Box, Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
import { AuthContext } from "../context";
// import { AxiosConfig } from "../utils";
import "./sidebar.css";
import { Ranking } from "./Ranking";

export const Sidebar = () => {
  const { setUserAuth, username, points } = useContext(AuthContext);
  let navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("user_Auth");
    setUserAuth(false);
    navigate("/home");
  };

  // const deleteCount = async () => {
  //   const { value: password } = await Swal.fire({
  //     title: "Tu contraseña es requerida",
  //     input: "password",
  //     html: `Ésta accion no se puede deshacer!`,
  //     showCancelButton: true,
  //     confirmButtonText: "Eliminar",
  //     cancelButtonText: "Cancelar",
  //     inputPlaceholder: "Contraseña",
  //     // icon: "warning",
  //     inputAttributes: {
  //       maxlength: 10,
  //       autocapitalize: "off",
  //       autocorrect: "off",
  //     },
  //   });

  //   if (password) {
  //     const TOKEN = userAuth;

  //     const res = await AxiosConfig.get("auth/private", {
  //       headers: {
  //         Authorization: `Bearer ${TOKEN}`,
  //       },
  //     });

  //     const userId = res.data.user._id;

  //     const Respuesta = await AxiosConfig.post(`auth/${userId}`, {
  //       password,
  //     });

  //     if (Respuesta.data.length < 2)
  //       return Swal.fire(
  //         "Contraseña Incorrecta",
  //         "Intentalo de nuevo",
  //         "error"
  //       );

  //     localStorage.removeItem("user_Auth");
  //     setUserAuth(false);
  //     navigate("/home");
  //   }
  // };

  return (
    <Box className="sidebar-container">
      <Avatar
        className="avatar-custom"
        sx={{
          bgcolor: "primary.dark",
          margin: "0 auto",
          width: "11rem",
          height: "11rem",
          fontSize: "150px",
          fontFamily: "Signika",
          top: "13px",
          // bottom: "20px",
          position: "relative",
          border: "4px solid",
        }}
        alt={username}
        src="https://assets.stickpng.com/images/585e4bf3cb11b227491c339a..png"
      />
      <h2 className="username-title">{username}</h2>
      <h3 className="points">{points} pts.</h3>

      <Box
        sx={{
          height: "45%",
          marginBottom: "15px",
        }}
      >
        <Ranking size="small" />
      </Box>

      <Button
        variant="contained"
        color="secondary"
        startIcon={<ExitToAppIcon />}
        onClick={Logout}
      >
        Cerrar sesion
      </Button>
      {/* <Button variant="contained" disableElevation={true} onClick={deleteCount}>
        Eliminar Cuenta
      </Button> */}
      {/* <span>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://digitalhub.fifa.com/m/6ebdb10c5731c32/original/FWC-2022-Match-Schedule-ES.pdf"
        >
          Calendario Oficial
        </a>
      </span> */}
    </Box>
  );
};

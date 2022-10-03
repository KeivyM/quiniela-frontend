import { Avatar } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Quiniela } from "../components";
// import { CarruselMUI } from "../components/CarruselMUI";
// import { CarruselMUIText } from "../components/CarruselMUIText";
import { AuthContext } from "../context";
import { AxiosConfig } from "../utils";

export const Dashboard = () => {
  const { setUserAuth, username, points, userAuth } = useContext(AuthContext);

  let navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("user_Auth");
    setUserAuth(false);
    navigate("/home");
  };

  const deleteCount = async () => {
    await Swal.fire({
      title: "¿Estas seguro de eliminar la cuenta?",
      text: "Se borrarán todas tus predicciones.",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      icon: "warning",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const TOKEN = userAuth;

        const res = await AxiosConfig.get("auth/private", {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        const userId = res.data.user._id;
        // console.log(userId);

        AxiosConfig.delete(`http://localhost:3000/auth/${userId}`);
        localStorage.removeItem("user_Auth");
        setUserAuth(false);
        navigate("/home");
      } else if (result.isDenied) return;
    });
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
        <button onClick={Logout}>Cerrar sesion</button>
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
        <button onClick={deleteCount}>Eliminar Cuenta</button>
      </div>
      <div style={{ background: "#ced", width: "100%" }}>
        <Quiniela />
      </div>
      <hr />
      {/* <CarruselMUI /> */}
      {/* <CarruselMUIText /> */}
    </div>
  );
};

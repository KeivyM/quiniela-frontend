import { Box, Typography } from "@mui/material";
import { FormLogin } from "../components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import image from "../assets/fauzan-saari-cjYQBSKDSII-unsplash.jpg";
import "./loginPage.css";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    // <Box sx={{ bgcolor: "aqua", padding: "50px" }}>
    //   <h3>Iniciar sesión</h3>
    //   <FormLogin />
    // </Box>

    <Box
      className="page-login"
      style={{
        backgroundImage: `linear-gradient(65deg, #8d1b3d, transparent) , url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      sx={{
        // bgcolor: "aqua",
        width: "100%",
        height: "100vh",
        margin: 0,
        display: "flex",
        alignItems: "center",
        padding: "50px",
        boxSizing: "border-box",
      }}
    >
      <Box
        style={{ backdropFilter: "blur(3px)", borderRadius: "20px" }}
        sx={{
          bgcolor: "#ccdddde0",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          // width: "40%",
          padding: "40px",
          minWidth: "400px",
          maxWidth: "450px",
          marginLeft: "50px",
        }}
      >
        <Link style={{ color: "#000" }} to="/home">
          <ArrowBackIcon
            style={{ fontSize: "32px" }}
            className="icon-arrowBack"
          />
        </Link>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "30px" }}>Iniciar sesión</Typography>
          <Typography sx={{ fontSize: "12px" }}>
            Coloca tus credenciales para acceder a tu cuenta
          </Typography>
        </Box>

        <FormLogin />
      </Box>
    </Box>
  );
};

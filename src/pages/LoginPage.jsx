import { Box, Typography } from "@mui/material";
import { FormLogin } from "../components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import image from "../assets/fauzan-saari-cjYQBSKDSII-unsplash.jpg";
import "./loginPage.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context";
import { Loading } from "../components/Loading";

export const LoginPage = () => {
  const { loading } = useContext(AuthContext);
  return (
    <>
      {loading && <Loading />}
      <Box
        className="page-login"
        style={{
          backgroundImage: `linear-gradient(65deg, #8d1b3d, transparent) , url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        sx={{
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
    </>
  );
};

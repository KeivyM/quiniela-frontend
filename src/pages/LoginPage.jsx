import { Box, Typography } from "@mui/material";
import { FormLogin } from "../components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context";
import { Loading } from "../components/Loading";
import "./loginPage.css";

export const LoginPage = () => {
  const { loading } = useContext(AuthContext);

  return (
    <>
      {loading && <Loading />}
      <Box className="page-login">
        <Box className="container-form-login" sx={{ bgcolor: "#ccdddde0" }}>
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
            <Typography className="title-login">Iniciar sesión</Typography>
            <Typography className="text-login">
              Coloca tus credenciales para acceder a tu cuenta
            </Typography>
          </Box>

          <FormLogin />
        </Box>
      </Box>
    </>
  );
};

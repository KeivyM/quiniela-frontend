import { Box, Typography } from "@mui/material";
import { FormRegister, Loading } from "../components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context";
import "./registerPage.css";

export const RegisterPage = () => {
  const { loading } = useContext(AuthContext);

  return (
    <>
      {loading && <Loading />}
      <Box className="page-register">
        <Box className="container-form-register" sx={{ bgcolor: "#ccdddde0" }}>
          <Link style={{ color: "#000" }} to="/home">
            <ArrowBackIcon
              style={{ fontSize: "32px" }}
              className="icon-arrowBack"
            />
          </Link>
          <Typography className="title-register" sx={{ fontSize: "30px" }}>
            Registrarse
          </Typography>
          <FormRegister />
        </Box>
      </Box>
    </>
  );
};

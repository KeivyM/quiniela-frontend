import { Box, Typography } from "@mui/material";
import { FormRegister } from "../components";
import image from "../assets/fauzan-saari-cjYQBSKDSII-unsplash.jpg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./registerPage.css";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <Box
      className="page-register"
      style={{
        backgroundImage: `url(${image})`,
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
          flexDirection: "column",
          alignItems: "center",
          padding: "40px",
          minWidth: "370px",
          maxWidth: "620px",
          marginLeft: "50px",
        }}
      >
        <Link style={{ color: "#000" }} to="/home">
          <ArrowBackIcon
            style={{ fontSize: "32px" }}
            className="icon-arrowBack"
          />
        </Link>
        <Typography sx={{ fontSize: "30px" }}>Registrarse</Typography>
        <FormRegister />
      </Box>
    </Box>
  );
};

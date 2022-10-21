import { Box, Typography } from "@mui/material";
import { FormRegister } from "../components";
import image from "../assets/fauzan-saari-cjYQBSKDSII-unsplash.jpg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./registerPage.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context";
import { Loading } from "../components/Loading";

export const RegisterPage = () => {
  const { loading } = useContext(AuthContext);

  return (
    <>
      {loading && <Loading />}
      <Box
        className="page-register"
        style={{
          backgroundImage: `linear-gradient(65deg, #8d1b3d, transparent) , url(${image})`,
          // backgroundPosition: "center",
          // backgroundSize: "cover",
          // backgroundRepeat: "no-repeat",
        }}
        sx={{
          width: "100%",
          height: "100vh",
          // margin: 0,
          // display: "flex",
          // alignItems: "center",
          // padding: "50px",
          // boxSizing: "border-box",
        }}
      >
        <Box
          className="container-form-register"
          style={{ backdropFilter: "blur(3px)", borderRadius: "20px" }}
          sx={{
            bgcolor: "#ccdddde0",
            // display: "flex",
            // flexDirection: "column",
            // alignItems: "center",
            // padding: "40px",
            // minWidth: "370px",
            // maxWidth: "620px",
            // marginLeft: "50px",
          }}
        >
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

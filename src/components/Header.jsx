import { Image } from "mui-image";
import { Link, useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import petImg from "../assets/imgPet.png";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./header.css";
import { useState } from "react";

export const Header = () => {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="Header">
      <Box className="container-imgs">
        <Image src={logo1} width="auto" height="85%" alt="logo" />
        <Image src={logo2} width="auto" height="70%" alt="logo" />
      </Box>
      <Box className="btns-menu-desktop" style={{ alignItems: "center" }}>
        <Box className="container-btns">
          <h3>
            <Link className="btns-auth" to="/login">
              Iniciar Sesion
            </Link>
          </h3>
          <h3>
            <Link className="btns-auth" to="/register">
              Registrarse
            </Link>
          </h3>
        </Box>
        <Image src={petImg} width={87} alt="logo" />
      </Box>
      <Box className="btns-menu-movil">
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon sx={{ fontSize: "35px" }} />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => navigate("/login")}>Iniciar Sesion</MenuItem>
          <MenuItem onClick={() => navigate("/register")}>Registrarse</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

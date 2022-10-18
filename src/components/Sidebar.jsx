import { Box, Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";
import { Ranking } from "./Ranking";
import "./sidebar.css";

export const Sidebar = () => {
  const { setUserAuth, username, points } = useContext(AuthContext);
  let navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("user_Auth");
    setUserAuth(false);
    navigate("/home");
  };

  return (
    <Box className="sidebar-container">
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
    </Box>
  );
};

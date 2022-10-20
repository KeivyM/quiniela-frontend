import { Box, Button, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";
import { Ranking } from "./Ranking";
import "./sidebar.css";

export const Sidebar = () => {
  const { setUserAuth, username, points, setPoints, setUsername, setLoading } =
    useContext(AuthContext);
  let navigate = useNavigate();

  const Logout = () => {
    setLoading(true);
    setPoints("");
    setUsername("");
    setUserAuth(false);
    localStorage.removeItem("user_Auth");
    navigate("/home");
  };

  return (
    <Box className="sidebar-container">
      <Typography
        sx={{ color: "#000d", fontWeight: "600", fontSize: "2rem" }}
        className="username-title"
      >
        {username}
      </Typography>
      <Typography
        sx={{
          bgcolor: "primary.main",
          fontSize: "1.1rem",
          marginBottom: "10px",
          fontWeight: "500",
        }}
        className="points"
      >
        {points} pts.
      </Typography>

      <Box
        sx={{
          height: "70%",
          marginBottom: "15px",
        }}
      >
        <Ranking size="small" />
      </Box>

      <Button
        variant="contained"
        sx={{
          color: "primary.text",
          bgcolor: "primary.main",
        }}
        startIcon={<ExitToAppIcon />}
        onClick={Logout}
      >
        Cerrar sesion
      </Button>
    </Box>
  );
};

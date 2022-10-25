import { Box, Button, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useContext } from "react";
import { AuthContext } from "../context";
import { Ranking } from "./Ranking";
import "./sidebar.css";

export const Sidebar = ({ showUsers }) => {
  const { username, points, Logout } = useContext(AuthContext);

  return (
    <Box className={`sidebar-container show ${showUsers ? "hidden" : ""}`}>
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
        className="container-ranking"
        sx={{
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

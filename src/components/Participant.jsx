import { Box, Typography } from "@mui/material";
import "./participant.css";

export const Participant = ({ user, size = "big" }) => {
  return (
    <Box
      sx={{ bgcolor: "custom.flagCatar" }}
      style={{ margin: "2px 0px" }}
      className={size === "big" ? "participant-big" : "participant-small"}
    >
      <Typography
        style={{
          width: "80%",
          paddingLeft: "8px",
        }}
        sx={{
          color: "custom.text",
          textAlign: "left",
        }}
      >
        {user.username}
      </Typography>
      <Typography
        sx={{
          color: "custom ",
        }}
        style={{ width: "20%", color: "#f5deb3" }}
      >
        {user?.points}
      </Typography>
    </Box>
  );
};

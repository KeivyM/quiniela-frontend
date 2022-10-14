import { Box } from "@mui/material";
import "./participant.css";

export const Participant = ({ user, size = "big" }) => {
  return (
    <Box
      sx={{ bgcolor: "secondary.mainOpacity" }}
      className={size === "big" ? "participant-big" : "participant-small"}
    >
      <h4 style={{ width: "50%" }}>{user.username}</h4>
      <h4 style={{ width: "50%" }}>{user?.points}</h4>
    </Box>
  );
};

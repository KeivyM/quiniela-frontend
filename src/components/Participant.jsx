import { Box } from "@mui/material";
import "./participant.css";

export const Participant = ({ user, size = "big" }) => {
  return (
    <Box
      sx={{ bgcolor: "secondary.secondOpacity" }}
      style={{ margin: "2px 0px" }}
      className={size === "big" ? "participant-big" : "participant-small"}
    >
      <h4 style={{ width: "80%", color: "#f5deb3", textAlign: "left" }}>
        {user.username}
      </h4>
      <h4 style={{ width: "20%", color: "#f5deb3" }}>{user?.points}</h4>
    </Box>
  );
};

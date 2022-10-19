import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const Loading = () => {
  return (
    <Box
      style={{
        position: "absolute",
        zIndex: "1000000000",
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: "#f4f4f444",
      }}
    >
      <CircularProgress color="primary" size={60} />
    </Box>
  );
};

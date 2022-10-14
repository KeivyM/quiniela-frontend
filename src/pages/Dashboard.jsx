import { Box } from "@mui/material";
import { CarouselQuinielas, Sidebar } from "../components";

export const Dashboard = () => {
  return (
    <Box style={{ display: "flex" }} sx={{ bgcolor: "custom.light" }}>
      <Sidebar />
      <Box
        sx={{
          bgcolor: "#0F4471",
          width: "100%",
          height: "100vh",
          padding: "50px",
          boxSizing: "border-box",
        }}
      >
        <CarouselQuinielas />
      </Box>
    </Box>
  );
};

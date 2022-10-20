import { Box } from "@mui/material";
import { useContext } from "react";
import { CarouselQuinielas, Sidebar } from "../components";
import { Loading } from "../components/Loading";
import { AuthContext } from "../context";

export const Dashboard = () => {
  const { loading } = useContext(AuthContext);

  return (
    <>
      {loading && <Loading />}
      <Box style={{ display: "flex" }} sx={{ bgcolor: "#99c3E1" }}>
        <Sidebar />
        <Box
          sx={{
            bgcolor: "#99c3E1",
            width: "100%",
            height: "100vh",
            padding: "50px",
            boxSizing: "border-box",
          }}
        >
          <CarouselQuinielas />
        </Box>
      </Box>
    </>
  );
};

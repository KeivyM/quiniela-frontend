import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { CarouselQuinielas, Sidebar } from "../components";
import { Loading } from "../components/Loading";
import { AuthContext } from "../context";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import "./dashboard.css";

export const Dashboard = () => {
  const [showUsers, setShowUsers] = useState(true);
  const { loading } = useContext(AuthContext);

  return (
    <>
      {loading && <Loading />}
      <Box
        className="container-dashboard"
        // style={{ display: "flex", maxWidth: "2000px" }}
        sx={{ bgcolor: "#99c3E1" }}
      >
        <PeopleAltIcon
          className="icon-participants"
          onClick={() => setShowUsers(!showUsers)}
        />
        <Sidebar showUsers={showUsers} />
        <Box
          className="container-carousel"
          sx={{
            bgcolor: "#99c3E1",
            // width: "100%",
            // height: "100vh",
            // padding: "50px",
            // boxSizing: "border-box",
          }}
        >
          <CarouselQuinielas />
        </Box>
      </Box>
    </>
  );
};

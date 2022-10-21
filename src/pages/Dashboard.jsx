import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { CarouselQuinielas, Sidebar } from "../components";
import { Loading } from "../components/Loading";
import { AuthContext } from "../context";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

export const Dashboard = () => {
  const [showUsers, setShowUsers] = useState(true);
  const { loading } = useContext(AuthContext);

  return (
    <>
      {loading && <Loading />}
      <Box
        style={{ display: "flex", maxWidth: "2000px" }}
        sx={{ bgcolor: "#99c3E1" }}
      >
        <PeopleAltIcon
          onClick={() => setShowUsers(!showUsers)}
          id={`icon-participants`}
        />
        <Sidebar showUsers={showUsers} />
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

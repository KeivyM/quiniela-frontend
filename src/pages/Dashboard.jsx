import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { CarouselQuinielas, Sidebar, Loading } from "../components";
import { AuthContext } from "../context";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import "./dashboard.css";

export const Dashboard = () => {
  const [showUsers, setShowUsers] = useState(true);
  const { loading } = useContext(AuthContext);

  return (
    <>
      {loading && <Loading />}
      <Box className="container-dashboard" sx={{ bgcolor: "#99c3E1" }}>
        <Box className={`icon-participants`}>
          {showUsers ? (
            <MenuRoundedIcon
              className={`icon-participants ${
                showUsers ? "hiddenIcon" : "showIcon"
              }`}
              onClick={() => setShowUsers(!showUsers)}
            />
          ) : (
            <ClearRoundedIcon
              className={`icon-participants ${
                showUsers ? "hiddenIcon" : "showIcon"
              }`}
              onClick={() => setShowUsers(!showUsers)}
            />
          )}
        </Box>
        <Sidebar showUsers={showUsers} />
        <Box className="container-carousel" sx={{ bgcolor: "#99c3E1" }}>
          <CarouselQuinielas />
        </Box>
      </Box>
    </>
  );
};

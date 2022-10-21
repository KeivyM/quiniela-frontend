import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AxiosConfig } from "../utils";
import { Participant } from "./Participant";
import "./ranking.css";

export const Ranking = ({ size = "big" }) => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const { data } = await AxiosConfig.get("/auth");
    data.sort((a, b) => b.points - a.points);
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box
      sx={{ bgcolor: "secondary.light", borderRadius: "5px" }}
      className={`ranking-scrollbar ${
        size === "big" ? "ranking-big" : "ranking-small"
      }`}
    >
      <Typography
        className="title-ranking"
        style={
          {
            // textShadow: "0 0 5px black",
            // fontWeight: 200,
            // color: "white",
            // margin: "14px 0 -2px",
          }
        }
      >
        {size === "big" ? "Ranking de Participantes" : "Participantes"}
      </Typography>
      <Box className="container-name-points">
        <Typography
          className="ranking-subtitles subtitle-name"
          style={{ width: "75%", textAlign: "left", color: "white" }}
        >
          Nombre
        </Typography>
        <Typography
          className="ranking-subtitles subtitle-points"
          style={{ width: "25%", color: "white" }}
        >
          Puntos
        </Typography>
      </Box>
      <div className="list-participants">
        {users.map((user, i) => {
          return <Participant size={size} key={i} user={user} />;
        })}
      </div>
    </Box>
  );
};

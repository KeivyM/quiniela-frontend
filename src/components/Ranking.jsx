import { Box } from "@mui/material";
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
      <h2
        style={{
          textShadow: "0 0 5px black",
          fontWeight: 200,
          color: "white",
          margin: "14px 0 -2px",
        }}
      >
        {size === "big" ? "Ranking de Participantes" : "Participantes"}
      </h2>
      <Box
        className="container-name-points"
        style={{
          display: "flex",
          justifyContent: "space-around",
          textShadow: "0 0 5px black",
          padding: "10px 15px 0",
        }}
      >
        <h3 style={{ width: "75%", textAlign: "left", color: "white" }}>
          Nombre
        </h3>
        <h3 style={{ width: "25%", color: "white" }}>Puntos</h3>
      </Box>
      <div className="list-participants">
        {users.map((user, i) => {
          return <Participant size={size} key={i} user={user} />;
        })}
      </div>
    </Box>
  );
};

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
    <div className={size === "big" ? "ranking-big" : "ranking-small"}>
      <h2>{size === "big" ? "Ranking de Participantes" : "Participantes"}</h2>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h3>Nombre</h3>
        <h3>Puntos</h3>
      </div>
      {users.map((user, i) => {
        return <Participant size="small" key={i} user={user} />;
      })}
    </div>
  );
};

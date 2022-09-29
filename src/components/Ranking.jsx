import { useEffect, useState } from "react";
import { AxiosConfig } from "../utils";
import { Participant } from "./Participant";

const style = {
  background: "#cda9",
  width: "700px",
  color: "black",
  textAlign: "center",
  position: "relative",
  margin: "0 auto",
};

export const Ranking = () => {
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
    <div style={style}>
      <h2>Ranking de Participantes</h2>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h3>Nombre</h3>
        <h3>Puntos</h3>
      </div>
      {/* <hr /> */}
      {users.map((user, i) => {
        return <Participant key={i} user={user} />;
      })}
    </div>
  );
};

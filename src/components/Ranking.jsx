import React, { useEffect } from "react";
import { useState } from "react";
import { AxiosConfig } from "../utils/AxiosConfig";
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

  const funcion = async () => {
    const { data } = await AxiosConfig.get("/auth");
    setUsers(data);
  };

  useEffect(() => {
    funcion();
  }, []);

  return (
    <div style={style}>
      <h2>Ranking de Participantes</h2>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h4>Nombre</h4>
        <h4>Puntos</h4>
      </div>
      <hr />
      {users.map((user, i) => {
        return <Participant key={i} user={user} />;
      })}
    </div>
  );
};

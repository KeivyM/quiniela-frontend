import React from "react";
import { Participant } from "./Participant";

const style = {
  background: "#cda9",
  width: "700px",
  color: "black",
  textAlign: "center",
  position: "relative",
  margin: "0 auto",
};

const participants = [
  { name: "Luis", points: 342 },
  { name: "Marcos", points: 201 },
  { name: "Dario", points: 86 },
  { name: "Monica", points: 421 },
];

export const Ranking = () => {
  return (
    <div style={style}>
      <h2>Ranking de Participantes</h2>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h4>Nombre</h4>
        <h4>Puntos</h4>
      </div>
      <hr />
      {participants.map((participant) => {
        return <Participant participant={participant} />;
      })}
    </div>
  );
};

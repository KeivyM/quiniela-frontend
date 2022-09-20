import React from "react";

const style = {
  width: "100%",
  background: "#a86",
  display: "flex",
  justifyContent: "space-around",
  color: "black",
  fontSize: "18px",
};

export const Participant = ({ participant }) => {
  return (
    <div style={style}>
      <h3>{participant.name}</h3>
      <p>{participant.points}</p>
    </div>
  );
};

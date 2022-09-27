import React from "react";

const style = {
  width: "100%",
  background: "#a86",
  display: "flex",
  justifyContent: "space-around",
  color: "black",
  fontSize: "18px",
};

export const Participant = ({ user }) => {
  return (
    <div style={style}>
      <h3>{user.username}</h3>
      <p>{user?.points || "sin puntos"}</p>
    </div>
  );
};

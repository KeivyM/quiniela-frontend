import React from "react";
import { Rival } from "./Rival";

const array = [1, 2, 3, 4, 5, 6];
const style = {
  background: "#cda9",
  width: "700px",
  color: "black",
  textAlign: "center",
  margin: "0 auto",
};
export const Calendar = () => {
  return (
    <div style={style}>
      <h2>Jornada 1</h2>
      <div>
        <hr />
        {array.map(() => {
          return <Rival />;
        })}
      </div>
    </div>
  );
};

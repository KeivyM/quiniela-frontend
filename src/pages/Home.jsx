import React from "react";
import { Calendar } from "../components/Calendar";
import { Header } from "../components/Header";
import { Ranking } from "../components/Ranking";
import fondo from "../fondo2.jpg";

const style = {
  width: "100vw",
  height: "100vh",
  backgroundImage: `url(${fondo})`,

  color: "white",
  backgroundSize: "cover",
  backgroundPosition: "center",
  margin: 0,
  position: "fixed",
  overflow: "auto",
};

export const Home = () => {
  return (
    <div style={style}>
      <div style={{ width: "100vw", background: "" }}>
        <Header />
        <h1 style={{ margin: 0 }}>Landing Page</h1>
        <div>
          <h2>Lorem </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
            aperiam corporis quisquam cumque id quasi necessitatibus debitis
            veritatis totam voluptatem vero, neque harum esse molestias magnam
            provident
          </p>
        </div>

        <hr />
        <Calendar />
        <Ranking />
      </div>
    </div>
  );
};

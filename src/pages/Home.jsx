import React from "react";
import { Calendar } from "../components/Calendar";
import { Header } from "../components/Header";
import { Ranking } from "../components/Ranking";

const style = {
  width: "100vw",
  height: "100vh",
  backgroundImage:
    'url("https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")',
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
      <div style={{ width: "60%", background: "#ccc5" }}>
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

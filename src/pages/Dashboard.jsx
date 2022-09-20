import axios from "axios";
import { useEffect } from "react";
// import { CarruselMUI } from "../components/CarruselMUI";
import { CarruselMUIText } from "../components/CarruselMUIText";
import { EquiposAcertar } from "../components/EquiposAcertar";

export const Dashboard = () => {
  // const peticion = () => {
  //   axios
  //     .get("https://worldcup.sfg.io/teams/")
  //     .then((res) => console.log(res))
  //     .catch((error) => console.log("error: ", error));

  // };

  // useEffect(() => {
  //   peticion();
  // }, []);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          height: "100vh",
          width: "200px",
          padding: "10px",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <h2>Mario Carrera</h2>
        <strong>325 pts.</strong>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://digitalhub.fifa.com/m/6ebdb10c5731c32/original/FWC-2022-Match-Schedule-ES.pdf"
        >
          Calendario
        </a>
      </div>
      <div style={{ background: "#ced", width: "100%" }}>
        <EquiposAcertar />
      </div>
      <hr />
      {/* <CarruselMUI /> */}
      {/* <CarruselMUIText /> */}
    </div>
  );
};

import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import logo from "../Qatar2022.png";

export const Header = () => {
  return (
    <div className="Header">
      {/* <h1>Logo</h1> */}
      <img src={logo} alt="logo" width={100} />
      <div style={{ display: "flex", gap: "20px" }}>
        <h3>
          <Link className="btns-auth" to="/login">
            Iniciar Sesion
          </Link>
        </h3>
        <h3>
          <Link className="btns-auth" to="/register">
            Registrarse
          </Link>
        </h3>
      </div>
    </div>
  );
};

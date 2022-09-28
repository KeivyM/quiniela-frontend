import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import logo from "../assets/Qatar2022.png";

export const Header = () => {
  return (
    <div className="Header">
      <img src={logo} alt="logo" width={100} />
      <div className="container-btns">
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

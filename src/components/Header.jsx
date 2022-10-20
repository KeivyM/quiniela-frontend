import "./header.css";
import { Link } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";

export const Header = () => {
  return (
    <div className="Header">
      <div style={{ display: "flex ", alignItems: "flex-end" }}>
        <img src={logo1} alt="logo" width={40} />
        <img src={logo2} alt="logo" height={55} />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
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
        <div className="container-mascota"></div>
      </div>
    </div>
  );
};

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { CarruselMUI } from "../components/CarruselMUI";
// import { CarruselMUIText } from "../components/CarruselMUIText";
import { EquiposAcertar } from "../components/EquiposAcertar";
import { AuthContext } from "../context";

export const Dashboard = () => {
  const { userAuth, setAuth } = useContext(AuthContext);
  // console.log(userAuth.username);
  let navigate = useNavigate();

  // const peticion = () => {
  //   axios
  //     .get("https://worldcup.sfg.io/teams/")
  //     .then((res) => console.log(res))
  //     .catch((error) => console.log("error: ", error));

  // };

  // useEffect(() => {
  //   peticion();
  // }, []);

  const Logout = () => {
    localStorage.removeItem("user_Auth");
    setAuth(false);
    navigate("/home");
  };

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
        <button onClick={Logout}>Cerrar sesion</button>
        <h2>{userAuth.username}</h2>
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

import { useEffect, useState } from "react";
import { Calendar } from "../components/Calendar";
import { Header } from "../components/Header";
import { Ranking } from "../components/Ranking";
import axios from "axios";
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
  const [matches, setMatches] = useState([]);

  const jornada1 = matches.filter((match) => match.matchTime < 1669370400);
  // .sort((a, b) => {
  //   if (a < b) return -1;
  //   if (a > b) return 1;
  // });
  const jornada2 = matches.filter(
    (match) => match.matchTime < 1669734000 && match.matchTime >= 1669370400
  );
  // .sort((a, b) => {
  //   if (a < b) return -1;
  //   if (a > b) return 1;
  // });
  const jornada3 = matches.filter((match) => match.matchTime >= 1669734000);
  // .sort((a, b) => {
  //   if (a < b) return -1;
  //   if (a > b) return 1;
  //   return 0;
  // });

  const getMatches = () => {
    axios
      .get(
        "http://api.isportsapi.com/sport/football/schedule?api_key=7ysUHBwXouU3Bb48&leagueId=1572"
      )
      .then((res) => setMatches(res.data.data));
  };

  useEffect(() => {
    getMatches();
  }, []);
  return (
    <div style={style}>
      <div style={{ width: "100vw", background: "" }}>
        <Header />
        <h1 style={{ margin: 0 }}>FIFA World Cup</h1>
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
        <Calendar title="Jornada 1" matches={jornada1} />
        <Calendar title="Jornada 2" matches={jornada2} />
        <Calendar title="Jornada 3" matches={jornada3} />

        <Ranking />
      </div>
    </div>
  );
};

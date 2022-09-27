import { useEffect, useState } from "react";
import { Calendar } from "../components/Calendar";
import { Header } from "../components/Header";
import { Ranking } from "../components/Ranking";
import axios from "axios";
import "./home.css";

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
    <div className="home-page">
      <Header />
      <div className="div-text-landing-page">
        <h1>FIFA World Cup</h1>
        <h2>Lorem </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
          aperiam corporis quisquam cumque id quasi necessitatibus debitis
          veritatis totam voluptatem vero, neque harum esse molestias magnam
          provident
        </p>
      </div>

      <div className="div-calendar-landing-page">
        <Calendar title="Jornada 1" matches={jornada1} />
        <Calendar title="Jornada 2" matches={jornada2} />
        <Calendar title="Jornada 3" matches={jornada3} />

        <Ranking />
      </div>
    </div>
  );
};

import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Calendar, Header, Ranking } from "../components";
import "./home.css";

export const Home = () => {
  const [matches, setMatches] = useState([]);

  const jornada1 = matches?.filter((match) => match.matchTime < 1669370400);
  const jornada2 = matches?.filter(
    (match) => match.matchTime < 1669734000 && match.matchTime >= 1669370400
  );
  const jornada3 = matches?.filter((match) => match.matchTime >= 1669734000);

  const getMatches = async () => {
    await axios
      .get(
        "https://quiniela-crazy-imagine.herokuapp.com/prediction/getMatchesFromApi"
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
        {/* <h2>Lorem </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
          aperiam corporis quisquam cumque id quasi necessitatibus debitis
          veritatis totam voluptatem vero, neque harum esse molestias magnam
          provident
        </p> */}
      </div>

      <div
        className="div-calendar-landing-page"
        style={{ padding: "80px 10px ", marginBottom: "200px" }}
      >
        <Box
          style={{
            height: "500px",
            width: "max-content",
            overflow: "auto",
            margin: "0 auto",
            marginBottom: "50px",
          }}
        >
          <Calendar title="Jornada 1" matches={jornada1} />
          <Calendar title="Jornada 2" matches={jornada2} />
          <Calendar title="Jornada 3" matches={jornada3} />
        </Box>

        <Ranking />
        {/* <div className="container-mascota"></div> */}
      </div>
    </div>
  );
};

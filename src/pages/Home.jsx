import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Calendar, Header, Ranking } from "../components";
import { Loading } from "../components/Loading";
import { AuthContext } from "../context";
import "./home.css";

export const Home = () => {
  const { loading, setLoading } = useContext(AuthContext);

  const [matches, setMatches] = useState([]);

  const jornada1 = matches?.filter((match) => match.matchTime < 1669370400);
  const jornada2 = matches?.filter(
    (match) => match.matchTime < 1669734000 && match.matchTime >= 1669370400
  );
  const jornada3 = matches?.filter(
    (match) => match.matchTime >= 1669734000 && match.matchTime <= 1670007600
  );
  const octavos = matches?.filter(
    (match) => match.matchTime > 1670007600 && match.matchTime <= 1670353200
  );
  const cuartos = matches?.filter(
    (match) => match.matchTime > 1670353200 && match.matchTime <= 1670698800
  );
  const semifinales = matches?.filter(
    (match) => match.matchTime > 1670698800 && match.matchTime <= 1671044400
  );
  const final = matches?.filter(
    (match) => match.matchTime > 1671044400 && match.matchTime <= 1671375600
  );

  const getMatches = async () => {
    await axios
    .get(
      "https://quiniela-crazy-imagine.herokuapp.com/prediction/getMatchesFromApi"
    )
    .then((res) => setMatches(res.data.data));
    //
    // await axios
    //   .get("http://localhost:3000/prediction/getMatchesFromApi")
    //   .then((res) => setMatches(res.data.data)); //local
  };

  useEffect(() => {
    setLoading(false);
    getMatches();
  }, [setLoading]);

  return (
    <>
      {loading && <Loading />}
      <Box className="home-page">
        <Header />
        <Box className="div-text-landing-page">
          <Typography variant="h1" sx={{ fontFamily: "Merriweather" }}>
            FIFA WORLD CUP
          </Typography>
        </Box>

        <Box
          className="div-calendar-landing-page"
          style={{
            background: "#dbdbdbd1",
          }}
        >
          <Box
            className="container-calendars"
            sx={{
              bgcolor: "primary.main",
            }}
          >
            <Calendar title="Jornada 1" matches={jornada1} />
            <Calendar title="Jornada 2" matches={jornada2} />
            <Calendar title="Jornada 3" matches={jornada3} />
            <Calendar title="Octavos de final" matches={octavos} />
            <Calendar title="Cuartos de final" matches={cuartos} />
            <Calendar title="Semifinales" matches={semifinales} />
            <Calendar title="Final" matches={final} />
          </Box>

          <Ranking size="big" />
        </Box>
      </Box>
    </>
  );
};

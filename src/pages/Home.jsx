import { useEffect, useState } from "react";
import { Calendar } from "../components/Calendar";
import { Header } from "../components/Header";
import { Ranking } from "../components/Ranking";
// import axios from "axios";
import "./home.css";

export const Home = () => {
  const [matches, setMatches] = useState([]);

  const jornada1 = matches?.filter((match) => match.matchTime < 1669370400);
  const jornada2 = matches?.filter(
    (match) => match.matchTime < 1669734000 && match.matchTime >= 1669370400
  );
  const jornada3 = matches?.filter((match) => match.matchTime >= 1669734000);

  const getMatches = () => {
    // axios
    //   .get(
    //     "http://api.isportsapi.com/sport/football/schedule?api_key=7ysUHBwXouU3Bb48&leagueId=1572"
    //   )
    //   .then((res) => setMatches(res.data.data));
    setMatches([
      {
        awayCorner: 0,
        awayHalfScore: 0,
        awayId: "778",
        awayName: "Brazil",
        awayRank: "",
        awayRed: 0,
        awayScore: 0,
        awayYellow: 0,
        explain: "",
        extraExplain: {
          kickOff: 0,
          minute: 0,
          homeScore: 0,
          awayScore: 0,
          extraTimeStatus: 0,
        },
        group: "G",
        halfStartTime: 0,
        hasLineup: false,
        homeCorner: 0,
        homeHalfScore: 0,
        homeId: "793",
        homeName: "Cameroon",
        homeRank: "",
        homeRed: 0,
        homeScore: 0,
        homeYellow: 0,
        leagueColor: "#660000",
        leagueId: "1572",
        leagueName: "FIFA World Cup",
        leagueShortName: "World Cup",
        leagueType: 2,
        location: "",
        matchId: "379058122",
        matchTime: 1670007600,
        neutral: true,
        round: "Groups",
        season: "2022",
        stageId: "21534",
        status: 0,
        subLeagueId: "",
        subLeagueName: "",
        temperature: "",
        weather: "",
      },
      {
        awayCorner: 0,
        awayHalfScore: 0,
        awayId: "778",
        awayName: "Japan",
        awayRank: "",
        awayRed: 0,
        awayScore: 0,
        awayYellow: 0,
        explain: "",
        extraExplain: {
          kickOff: 0,
          minute: 0,
          homeScore: 0,
          awayScore: 0,
          extraTimeStatus: 0,
        },
        group: "G",
        halfStartTime: 0,
        hasLineup: false,
        homeCorner: 0,
        homeHalfScore: 0,
        homeId: "793",
        homeName: "Germany",
        homeRank: "",
        homeRed: 0,
        homeScore: 0,
        homeYellow: 0,
        leagueColor: "#660000",
        leagueId: "1572",
        leagueName: "FIFA World Cup",
        leagueShortName: "World Cup",
        leagueType: 2,
        location: "",
        matchId: "379058122",
        matchTime: 1669554000,
        neutral: true,
        round: "Groups",
        season: "2022",
        stageId: "21534",
        status: 0,
        subLeagueId: "",
        subLeagueName: "",
        temperature: "",
        weather: "",
      },
      {
        awayCorner: 0,
        awayHalfScore: 0,
        awayId: "778",
        awayName: "Netherlands",
        awayRank: "",
        awayRed: 0,
        awayScore: 0,
        awayYellow: 0,
        explain: "",
        extraExplain: {
          kickOff: 0,
          minute: 0,
          homeScore: 0,
          awayScore: 0,
          extraTimeStatus: 0,
        },
        group: "G",
        halfStartTime: 0,
        hasLineup: false,
        homeCorner: 0,
        homeHalfScore: 0,
        homeId: "793",
        homeName: "Senegal",
        homeRank: "",
        homeRed: 0,
        homeScore: 0,
        homeYellow: 0,
        leagueColor: "#660000",
        leagueId: "1572",
        leagueName: "FIFA World Cup",
        leagueShortName: "World Cup",
        leagueType: 2,
        location: "",
        matchId: "379058122",
        matchTime: 1669046340,
        neutral: true,
        round: "Groups",
        season: "2022",
        stageId: "21534",
        status: 0,
        subLeagueId: "",
        subLeagueName: "",
        temperature: "",
        weather: "",
      },
    ]);
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

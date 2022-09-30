import axios from "axios";
import { useEffect, useState } from "react";
import { AxiosConfig } from "../utils";
import { Participant } from "./Participant";

const style = {
  background: "#cda9",
  width: "700px",
  color: "black",
  textAlign: "center",
  position: "relative",
  margin: "0 auto",
};

const dataDePrueba = [
  {
    matchId: "227058125",
    leagueType: 2,
    leagueId: "1572",
    leagueName: "FIFA World Cup",
    leagueShortName: "World Cup",
    leagueColor: "#660000",
    subLeagueId: "",
    subLeagueName: "",
    matchTime: 1668959940,
    halfStartTime: 0,
    status: 10,
    homeId: "904",
    homeName: "Qatar",
    awayId: "779",
    awayName: "Ecuador",
    homeScore: 7, //2
    awayScore: 5, //5
    homeHalfScore: 0,
    awayHalfScore: 0,
    homeRed: 0,
    awayRed: 0,
    homeYellow: 0,
    awayYellow: 0,
    homeCorner: 0,
    awayCorner: 0,
    homeRank: "",
    awayRank: "",
    season: "2022",
    stageId: "21534",
    round: "Groups",
    group: "A",
    location: "Khalifa International",
    weather: "",
    temperature: "",
    explain: "",
    extraExplain: {
      kickOff: 0,
      minute: 0,
      homeScore: 0,
      awayScore: 0,
      extraTimeStatus: 0,
      extraHomeScore: 0,
      extraAwayScore: 0,
      penHomeScore: 0,
      penAwayScore: 0,
      twoRoundsHomeScore: 0,
      twoRoundsAwayScore: 0,
      winner: 0,
    },
    hasLineup: false,
    neutral: false,
  },
  {
    matchId: "267058129",
    leagueType: 2,
    leagueId: "1572",
    leagueName: "FIFA World Cup",
    leagueShortName: "World Cup",
    leagueColor: "#660000",
    subLeagueId: "",
    subLeagueName: "",
    matchTime: 1669035600,
    halfStartTime: 0,
    status: -1,
    homeId: "744",
    homeName: "England",
    awayId: "783",
    awayName: "Iran",
    homeScore: 4, //9
    awayScore: 0, //4
    homeHalfScore: 0,
    awayHalfScore: 0,
    homeRed: 0,
    awayRed: 0,
    homeYellow: 0,
    awayYellow: 0,
    homeCorner: 0,
    awayCorner: 0,
    homeRank: "",
    awayRank: "",
    season: "2022",
    stageId: "21534",
    round: "Groups",
    group: "B",
    location: "",
    weather: "",
    temperature: "",
    explain: "",
    extraExplain: {
      kickOff: 0,
      minute: 0,
      homeScore: 0,
      awayScore: 0,
      extraTimeStatus: 0,
      extraHomeScore: 0,
      extraAwayScore: 0,
      penHomeScore: 0,
      penAwayScore: 0,
      twoRoundsHomeScore: 0,
      twoRoundsAwayScore: 0,
      winner: 0,
    },
    hasLineup: false,
    neutral: true,
  },
  {
    matchId: "237058126",
    leagueType: 2,
    leagueId: "1572",
    leagueName: "FIFA World Cup",
    leagueShortName: "World Cup",
    leagueColor: "#660000",
    subLeagueId: "",
    subLeagueName: "",
    matchTime: 1669046340,
    halfStartTime: 0,
    status: 10,
    homeId: "815",
    homeName: "Senegal",
    awayId: "646",
    awayName: "Netherlands",
    homeScore: 10, //4
    awayScore: 20, //2
    homeHalfScore: 0,
    awayHalfScore: 0,
    homeRed: 0,
    awayRed: 0,
    homeYellow: 0,
    awayYellow: 0,
    homeCorner: 0,
    awayCorner: 0,
    homeRank: "",
    awayRank: "",
    season: "2022",
    stageId: "21534",
    round: "Groups",
    group: "A",
    location: "",
    weather: "",
    temperature: "",
    explain: "",
    extraExplain: {
      kickOff: 0,
      minute: 0,
      homeScore: 0,
      awayScore: 0,
      extraTimeStatus: 0,
      extraHomeScore: 0,
      extraAwayScore: 0,
      penHomeScore: 0,
      penAwayScore: 0,
      twoRoundsHomeScore: 0,
      twoRoundsAwayScore: 0,
      winner: 0,
    },
    hasLineup: false,
    neutral: true,
  },
  {
    matchId: "393358121",
    leagueType: 2,
    leagueId: "1572",
    leagueName: "FIFA World Cup",
    leagueShortName: "World Cup",
    leagueColor: "#660000",
    subLeagueId: "",
    subLeagueName: "",
    matchTime: 1669057200,
    halfStartTime: 0,
    status: 1,
    homeId: "797",
    homeName: "USA",
    awayId: "7384",
    awayName: "Wales",
    homeScore: 3, //2
    awayScore: 3, //2
    homeHalfScore: 0,
    awayHalfScore: 0,
    homeRed: 0,
    awayRed: 0,
    homeYellow: 0,
    awayYellow: 0,
    homeCorner: 0,
    awayCorner: 0,
    homeRank: "",
    awayRank: "",
    season: "2022",
    stageId: "21534",
    round: "Groups",
    group: "B",
    location: "",
    weather: "",
    temperature: "",
    explain: "",
    extraExplain: {
      kickOff: 0,
      minute: 0,
      homeScore: 0,
      awayScore: 0,
      extraTimeStatus: 0,
      extraHomeScore: 0,
      extraAwayScore: 0,
      penHomeScore: 0,
      penAwayScore: 0,
      twoRoundsHomeScore: 0,
      twoRoundsAwayScore: 0,
      winner: 0,
    },
    hasLineup: false,
    neutral: true,
  },
];

export const Ranking = () => {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);

  const getUsers = async () => {
    const { data } = await AxiosConfig.get("/auth");
    data.sort((a, b) => b.points - a.points);
    setUsers(data);
  };

  const funcion = async () => {
    for (const user of users) {
      const { data } = await axios.post(
        "http://localhost:3000/quiniela/findQuinielasByUser",
        { userId: user._id }
      );

      //para borrar los puntos antes de agregarle mas
      // await axios.post("http://localhost:3000/auth/resetPoints", {
      //   userId: user._id,
      // });

      for (let index = 0; index < data.length; index++) {
        const promiseArray = data[index].prediction.map((predictionId) => {
          return axios
            .get(`http://localhost:3000/prediction/${predictionId}`)
            .then((res) => res.data);
        });

        const arrayPredictions = await Promise.all(promiseArray).then(
          (res) => res
        );
        // console.log(arrayPredictions);

        for (const objprueba of dataDePrueba) {
          if (objprueba.status === 0) continue;

          for (const match of arrayPredictions) {
            // console.log("Aqui", match);

            if (objprueba.matchId === match.matchId) {
              if (
                Number(match.results.homeScore) === objprueba.homeScore &&
                Number(match.results.awayScore) === objprueba.awayScore
              ) {
                //darle 6 puntos por acertar el marcador
                console.log("6 por marcador Y resultado");

                await axios.post("http://localhost:3000/auth/addPoints", {
                  userId: match.userId,
                  points: 6,
                });

                setUpdate(!update);
              } else if (
                objprueba.homeScore > objprueba.awayScore &&
                Number(match.results.homeScore) >
                  Number(match.results.awayScore)
              ) {
                // darle 3 puntos por acertar el resultado
                console.log("3 por resultado");
                await axios.post("http://localhost:3000/auth/addPoints", {
                  userId: match.userId,
                  points: 3,
                });
                setUpdate(!update);
              } else if (
                objprueba.homeScore < objprueba.awayScore &&
                Number(match.results.homeScore) <
                  Number(match.results.awayScore)
              ) {
                //"darle 3 puntos por acertar el resultado"
                console.log("3 por resultado");
                await axios.post("http://localhost:3000/auth/addPoints", {
                  userId: match.userId,
                  points: 3,
                });
                setUpdate(!update);
              }
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    funcion();
  }, []);

  useEffect(() => {
    getUsers();
  }, [update]);

  return (
    <div style={style}>
      <h2>Ranking de Participantes</h2>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h3>Nombre</h3>
        <h3>Puntos</h3>
      </div>
      {/* <hr /> */}
      {users.map((user, i) => {
        return <Participant key={i} user={user} />;
      })}
    </div>
  );
};

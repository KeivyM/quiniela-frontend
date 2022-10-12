import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context";
import { AxiosConfig } from "../utils";
import Swal from "sweetalert2";
import { Match } from "./Match";
import { MatchNothing } from "./MatchNothing";
import moment from "moment";
import "moment-timezone";
import { Box, Button } from "@mui/material";
import { QuinielaPlayer } from "./QuinielaPlayer";
import { Save } from "@mui/icons-material";
// import { useForm } from "../hooks/useForm";

// const dataDePrueba = [
//   {
//     matchId: "227058125",
//     leagueType: 2,
//     leagueId: "1572",
//     leagueName: "FIFA World Cup",
//     leagueShortName: "World Cup",
//     leagueColor: "#660000",
//     subLeagueId: "",
//     subLeagueName: "",
//     matchTime: 1668959940,
//     halfStartTime: 0,
//     status: 0,
//     homeId: "904",
//     homeName: "Qatar",
//     awayId: "779",
//     awayName: "Ecuador",
//     homeScore: 0,
//     awayScore: 0,
//     homeHalfScore: 0,
//     awayHalfScore: 0,
//     homeRed: 0,
//     awayRed: 0,
//     homeYellow: 0,
//     awayYellow: 0,
//     homeCorner: 0,
//     awayCorner: 0,
//     homeRank: "",
//     awayRank: "",
//     season: "2022",
//     stageId: "21534",
//     round: "Groups",
//     group: "A",
//     location: "Khalifa International",
//     weather: "",
//     temperature: "",
//     explain: "",
//     extraExplain: {
//       kickOff: 0,
//       minute: 0,
//       homeScore: 0,
//       awayScore: 0,
//       extraTimeStatus: 0,
//       extraHomeScore: 0,
//       extraAwayScore: 0,
//       penHomeScore: 0,
//       penAwayScore: 0,
//       twoRoundsHomeScore: 0,
//       twoRoundsAwayScore: 0,
//       winner: 0,
//     },
//     hasLineup: false,
//     neutral: false,
//   },
//   {
//     matchId: "267058129",
//     leagueType: 2,
//     leagueId: "1572",
//     leagueName: "FIFA World Cup",
//     leagueShortName: "World Cup",
//     leagueColor: "#660000",
//     subLeagueId: "",
//     subLeagueName: "",
//     matchTime: 1669035600,
//     halfStartTime: 0,
//     status: 0,
//     homeId: "744",
//     homeName: "England",
//     awayId: "783",
//     awayName: "Iran",
//     homeScore: 0,
//     awayScore: 0,
//     homeHalfScore: 0,
//     awayHalfScore: 0,
//     homeRed: 0,
//     awayRed: 0,
//     homeYellow: 0,
//     awayYellow: 0,
//     homeCorner: 0,
//     awayCorner: 0,
//     homeRank: "",
//     awayRank: "",
//     season: "2022",
//     stageId: "21534",
//     round: "Groups",
//     group: "B",
//     location: "",
//     weather: "",
//     temperature: "",
//     explain: "",
//     extraExplain: {
//       kickOff: 0,
//       minute: 0,
//       homeScore: 0,
//       awayScore: 0,
//       extraTimeStatus: 0,
//       extraHomeScore: 0,
//       extraAwayScore: 0,
//       penHomeScore: 0,
//       penAwayScore: 0,
//       twoRoundsHomeScore: 0,
//       twoRoundsAwayScore: 0,
//       winner: 0,
//     },
//     hasLineup: false,
//     neutral: true,
//   },
//   {
//     matchId: "237058126",
//     leagueType: 2,
//     leagueId: "1572",
//     leagueName: "FIFA World Cup",
//     leagueShortName: "World Cup",
//     leagueColor: "#660000",
//     subLeagueId: "",
//     subLeagueName: "",
//     matchTime: 1669046340,
//     halfStartTime: 0,
//     status: 0,
//     homeId: "815",
//     homeName: "Senegal",
//     awayId: "646",
//     awayName: "Netherlands",
//     homeScore: 0,
//     awayScore: 0,
//     homeHalfScore: 0,
//     awayHalfScore: 0,
//     homeRed: 0,
//     awayRed: 0,
//     homeYellow: 0,
//     awayYellow: 0,
//     homeCorner: 0,
//     awayCorner: 0,
//     homeRank: "",
//     awayRank: "",
//     season: "2022",
//     stageId: "21534",
//     round: "Groups",
//     group: "A",
//     location: "",
//     weather: "",
//     temperature: "",
//     explain: "",
//     extraExplain: {
//       kickOff: 0,
//       minute: 0,
//       homeScore: 0,
//       awayScore: 0,
//       extraTimeStatus: 0,
//       extraHomeScore: 0,
//       extraAwayScore: 0,
//       penHomeScore: 0,
//       penAwayScore: 0,
//       twoRoundsHomeScore: 0,
//       twoRoundsAwayScore: 0,
//       winner: 0,
//     },
//     hasLineup: false,
//     neutral: true,
//   },
//   {
//     matchId: "393358121",
//     leagueType: 2,
//     leagueId: "1572",
//     leagueName: "FIFA World Cup",
//     leagueShortName: "World Cup",
//     leagueColor: "#660000",
//     subLeagueId: "",
//     subLeagueName: "",
//     matchTime: 1669057200,
//     halfStartTime: 0,
//     status: 0,
//     homeId: "797",
//     homeName: "USA",
//     awayId: "7384",
//     awayName: "Wales",
//     homeScore: 0,
//     awayScore: 0,
//     homeHalfScore: 0,
//     awayHalfScore: 0,
//     homeRed: 0,
//     awayRed: 0,
//     homeYellow: 0,
//     awayYellow: 0,
//     homeCorner: 0,
//     awayCorner: 0,
//     homeRank: "",
//     awayRank: "",
//     season: "2022",
//     stageId: "21534",
//     round: "Groups",
//     group: "B",
//     location: "",
//     weather: "",
//     temperature: "",
//     explain: "",
//     extraExplain: {
//       kickOff: 0,
//       minute: 0,
//       homeScore: 0,
//       awayScore: 0,
//       extraTimeStatus: 0,
//       extraHomeScore: 0,
//       extraAwayScore: 0,
//       penHomeScore: 0,
//       penAwayScore: 0,
//       twoRoundsHomeScore: 0,
//       twoRoundsAwayScore: 0,
//       winner: 0,
//     },
//     hasLineup: false,
//     neutral: true,
//   },
// ];

// const phases = [{ timeStart: 1670079600 }];

console.log("");
const phases = {
  Grupos: { timeStart: 1668949200, timeEnd: 1670014800 }, //timeStart es a las 9 am y el primer partido es a las 12 pm  // timeEnd es a las 5pm y el ultimo partido a las 3pm
  Octavos: { timeStart: 1670072400, timeEnd: 1670360400 }, //timeStart: 9am primer partido 11am // timeEnd 5pm
  Cuartos: { timeStart: 1670590800, timeEnd: 1670706000 }, //timeStart: 9am primer partido 11am // timeEnd 5pm
  Semifinales: { timeStart: 1670950800, timeEnd: 1671051600 }, //timeStart: 1pm primer partido 3pm // timeEnd 5pm
  Final: { timeStart: 1671282000, timeEnd: 1671382800 }, //timeStart: 9am primer partido 11am // timeEnd 1pm
};

// const phases = {
//   Grupos: { timeStart: 1765417004, timeEnd: 1987014800 },
//   Octavos: { timeStart: 160072400, timeEnd: 160360400 },
//   Cuartos: { timeStart: 160590800, timeEnd: 167076000 },
//   Semifinales: { timeStart: 160950800, timeEnd: 167051600 },
//   Final: { timeStart: 1671282000, timeEnd: 1671382800 },
// };

export const Quiniela = ({ arrayDePartidos, phase }) => {
  const { userAuth } = useContext(AuthContext);
  const [predictions, setPredictions] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const getAllPredictions = useCallback(
    async (phase) => {
      const TOKEN = userAuth;

      const USER = await AxiosConfig.get("auth/private", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const userId = USER.data.user._id;

      const quiniela = await AxiosConfig.post("quiniela/find", {
        userId,
        phase,
      });

      if (!!quiniela === false) return;

      const predictionsId = quiniela.data.prediction;

      const arrayPredictions = [];
      if (!predictionsId) return;

      for (const id of predictionsId) {
        const PREDICTION = await AxiosConfig.get(`prediction/${id}`);
        delete PREDICTION.data._id;
        delete PREDICTION.data.__v;
        delete PREDICTION.data.userId;
        arrayPredictions.push(PREDICTION.data);
      }
      setPredictions(arrayPredictions);
    },
    [userAuth]
  );

  const onAddPredictions = (target, matchId) => {
    const { name, value } = target.target;

    if (predictions.length === 0) {
      setPredictions([{ matchId: matchId, results: { [name]: value } }]);
      return;
    }

    const result = predictions.find(
      (prediction) => prediction.matchId === matchId
    );

    if (!!result === false) {
      const newArray = [
        ...predictions,
        { matchId: matchId, results: { [name]: value } },
      ];
      setPredictions(newArray);
      return;
    }

    if (!!result) {
      const filtrado = predictions.filter(
        (prediction) => prediction.matchId !== matchId
      );

      const obj = predictions.find(
        (prediction) => prediction.matchId === matchId
      );

      const newObj = { ...obj, results: { ...obj.results, [name]: value } };

      setPredictions([...filtrado, newObj]);
      return;
    }
  };

  const addQuiniela = async () => {
    if (disabled) return console.log("No ha terminado la fase anterior");

    if (arrayDePartidos?.length < 1)
      return Swal.fire({
        title: "Tienes Problemas?",
        text: "Espera 5 min o intenta mañana",
        icon: "info",
        confirmButtonText: "Ok",
      });

    if (arrayDePartidos?.length !== predictions?.length)
      return Swal.fire({
        title: "Hay campos vacios!",
        text: "Toda la quiniela debe estar llena",
        icon: "info",
        confirmButtonText: "Ok",
      });

    for (const prediction of predictions) {
      if (
        !!prediction?.results.awayScore === false ||
        !!prediction?.results.homeScore === false
      )
        return Swal.fire({
          title: "Hay campos vacios!",
          text: "Toda la quiniela debe estar llena",
          icon: "info",
          confirmButtonText: "Ok",
        });
    }

    const body = {
      phase,
      predictions,
    };

    const TOKEN = userAuth;

    const res = await AxiosConfig.get("auth/private", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const userId = res.data.user._id;

    const values = { userId, phase };

    const { data } = await AxiosConfig.post("quiniela/find", values);

    if (!!data) {
      // actualizar quiniela
      await AxiosConfig.put(`quiniela/${data._id}`, body, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      Swal.fire({
        title: "Listo!",
        text: "Tu predicción se ha actualizado correctamente.",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } else {
      // crear quiniela:
      await AxiosConfig.post("quiniela/create", body, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      Swal.fire({
        title: "Listo!",
        text: "Tu predicción se ha creado correctamente.",
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
  };

  useEffect(() => {
    setPredictions([]);
    getAllPredictions(phase);
    document.getElementById("cambiarScroll").scrollTo(0, 0);
  }, [getAllPredictions, phase]);

  useEffect(() => {
    const dateUtc = moment.utc();
    const timeNow = moment
      .tz(dateUtc, "YYYY-MM-DD h:mm a", "America/Caracas")
      .unix();

    let boolean;

    switch (phase) {
      case "Grupos":
        boolean = timeNow >= phases.Grupos.timeStart;
        setDisabled(boolean);
        break;
      case "Octavos":
        boolean =
          timeNow < phases.Grupos?.timeEnd ||
          timeNow > phases.Octavos?.timeStart;
        setDisabled(boolean);
        break;
      case "Cuartos":
        boolean =
          timeNow < phases.Octavos?.timeEnd ||
          timeNow > phases.Cuartos?.timeStart;
        setDisabled(boolean);
        break;
      case "Semifinales":
        boolean =
          timeNow < phases.Cuartos?.timeEnd ||
          timeNow > phases.Semifinales?.timeStart;
        setDisabled(boolean);
        break;
      case "Final":
        boolean =
          timeNow < phases.Semifinales?.timeEnd ||
          timeNow > phases.Final?.timeStart;
        setDisabled(boolean);
        break;

      default:
        setDisabled(true);
        break;
    }
  }, [phase]);

  return (
    <Box
      sx={{
        bgcolor: "custom.light",
        boxSizing: "border-box",
        overflow: disabled ? "hidden" : "auto",
        height: "calc( 100vh - 116px )",
        // height: "500px",
        // borderRadius: "5px",
      }}
      id="cambiarScroll"
      style={{
        width: "100%",
        display: "flex",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {disabled && (
        //eliminar el & false
        <div
          style={{
            position: "absolute",
            background: "#ddd5",
            height: "100%",
            top: "0",
            width: "100%",
            left: "0",
            textAlign: "center",
            // borderRadius:'5px'
          }}
        >
          <p>Esta quiniela no esta disponible</p>
        </div>
      )}

      {phase === "Final" && <QuinielaPlayer disabled={disabled} />}
      {/* <form
        style={{ display: "grid", background: "primary.main" }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      > */}
      <Box
        component="form"
        // style={{ borderRadius: "5px" }}
        sx={{
          bgcolor: "primary.light",
          width: "100%",
          height: "max-content",
          // borderRadius: "50px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {arrayDePartidos?.map((obj, index) => {
          const prediction = predictions.find((e) => e.matchId === obj.matchId);

          const jornada2 = 1669370400;
          const jornada3 = 1669734000;

          const jornada =
            obj.matchTime < jornada2
              ? "1"
              : obj.matchTime < jornada3
              ? "2"
              : "3";

          const dateMoment = moment(obj.matchTime * 1000).format("lll");

          return (
            <div key={index}>
              {arrayDePartidos.length === 48 ? (
                <Match
                  prediction={prediction}
                  index={index}
                  jornada={jornada}
                  date={dateMoment}
                  setPredictions={setPredictions}
                  onAddPredictions={onAddPredictions}
                  {...obj}
                />
              ) : (
                <MatchNothing
                  disabled={disabled}
                  phase={phase}
                  prediction={prediction}
                  index={index}
                  date={dateMoment}
                  setPredictions={setPredictions}
                  onAddPredictions={onAddPredictions}
                  {...obj}
                />
              )}
            </div>
          );
        })}
        <Button
          variant="contained"
          type="submit"
          color="secondary"
          disabled={disabled}
          onClick={addQuiniela}
          startIcon={<Save />}
        >
          Guardar
        </Button>
      </Box>
      {/* </form> */}
    </Box>
  );
};

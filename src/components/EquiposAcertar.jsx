import { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Match } from "./Match";
import { AxiosConfig } from "../utils/AxiosConfig";
import { AuthContext } from "../context";
// import { useForm } from "../hooks/useForm";

export const EquiposAcertar = () => {
  const { userAuth } = useContext(AuthContext);
  const [phase, setPhase] = useState("");
  const [match, setMatches] = useState([1, 1]);
  const [predictions, setPredictions] = useState([]);

  const funcionAddPredictions = (target, matchId) => {
    const { name, value } = target.target;

    if (predictions.length === 0) {
      setPredictions((prev) => [
        ...prev,
        { matchId: matchId, results: { [name]: value } },
      ]);
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
    const body = {
      phase,
      predictions,
    };
    // console.log(body);

    const TOKEN = userAuth;

    //debo validar si ya existe la quiniela (actualizarla), si no exite agregarla.

    // const quiniela = await AxiosConfig.get(
    //   "quiniela/"
    // );

    const res = await AxiosConfig.get("auth/private", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const userId = res.data.user._id;
    console.log(userId);
    // const userQuinielas = res.data.user.quiniela;
    // console.log({ userId, phase, userQuinielas });

    const values = { userId, phase };
    // console.log({ userId, phase: "semifinales" });

    const { data } = await AxiosConfig.post("quiniela/find", values);
    console.log(data);

    if (!!data === false) {
      // para crear quiniela:
      const respuesta = await AxiosConfig.post("quiniela/create", body, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      console.log("añadido");
      return "añadido";
    } else {
      // para actualizar quiniela
      console.log(data._id);
      const respuesta = await AxiosConfig.put(`quiniela/${data._id}`, body, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
    }
  };

  // useEffect(() => {
  //   console.log(predictions);
  // }, [predictions]);

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  const predicciones = [];

  const getMatches = () => {
    axios
      .get(
        "http://api.isportsapi.com/sport/football/schedule?api_key=7ysUHBwXouU3Bb48&leagueId=1572"
      )
      .then((res) => setMatches(res.data.data));

    // setMatches([
    //   {
    //     awayCorner: 0,
    //     awayHalfScore: 0,
    //     awayId: "778",
    //     awayName: "Brazil",
    //     awayRank: "",
    //     awayRed: 0,
    //     awayScore: 0,
    //     awayYellow: 0,
    //     explain: "",
    //     extraExplain: {
    //       kickOff: 0,
    //       minute: 0,
    //       homeScore: 0,
    //       awayScore: 0,
    //       extraTimeStatus: 0,
    //     },
    //     group: "G",
    //     halfStartTime: 0,
    //     hasLineup: false,
    //     homeCorner: 0,
    //     homeHalfScore: 0,
    //     homeId: "793",
    //     homeName: "Cameroon",
    //     homeRank: "",
    //     homeRed: 0,
    //     homeScore: 0,
    //     homeYellow: 0,
    //     leagueColor: "#660000",
    //     leagueId: "1572",
    //     leagueName: "FIFA World Cup",
    //     leagueShortName: "World Cup",
    //     leagueType: 2,
    //     location: "",
    //     matchId: "379058122",
    //     matchTime: 1670007600,
    //     neutral: true,
    //     round: "Groups",
    //     season: "2022",
    //     stageId: "21534",
    //     status: 0,
    //     subLeagueId: "",
    //     subLeagueName: "",
    //     temperature: "",
    //     weather: "",
    //   },
    //   {
    //     awayCorner: 0,
    //     awayHalfScore: 0,
    //     awayId: "778",
    //     awayName: "Japan",
    //     awayRank: "",
    //     awayRed: 0,
    //     awayScore: 0,
    //     awayYellow: 0,
    //     explain: "",
    //     extraExplain: {
    //       kickOff: 0,
    //       minute: 0,
    //       homeScore: 0,
    //       awayScore: 0,
    //       extraTimeStatus: 0,
    //     },
    //     group: "G",
    //     halfStartTime: 0,
    //     hasLineup: false,
    //     homeCorner: 0,
    //     homeHalfScore: 0,
    //     homeId: "793",
    //     homeName: "Germany",
    //     homeRank: "",
    //     homeRed: 0,
    //     homeScore: 0,
    //     homeYellow: 0,
    //     leagueColor: "#660000",
    //     leagueId: "1572",
    //     leagueName: "FIFA World Cup",
    //     leagueShortName: "World Cup",
    //     leagueType: 2,
    //     location: "",
    //     matchId: "398058123",
    //     matchTime: 1669554000,
    //     neutral: true,
    //     round: "Groups",
    //     season: "2022",
    //     stageId: "21534",
    //     status: 0,
    //     subLeagueId: "",
    //     subLeagueName: "",
    //     temperature: "",
    //     weather: "",
    //   },
    //   {
    //     awayCorner: 0,
    //     awayHalfScore: 0,
    //     awayId: "778",
    //     awayName: "Netherlands",
    //     awayRank: "",
    //     awayRed: 0,
    //     awayScore: 0,
    //     awayYellow: 0,
    //     explain: "",
    //     extraExplain: {
    //       kickOff: 0,
    //       minute: 0,
    //       homeScore: 0,
    //       awayScore: 0,
    //       extraTimeStatus: 0,
    //     },
    //     group: "G",
    //     halfStartTime: 0,
    //     hasLineup: false,
    //     homeCorner: 0,
    //     homeHalfScore: 0,
    //     homeId: "793",
    //     homeName: "Senegal",
    //     homeRank: "",
    //     homeRed: 0,
    //     homeScore: 0,
    //     homeYellow: 0,
    //     leagueColor: "#660000",
    //     leagueId: "1572",
    //     leagueName: "FIFA World Cup",
    //     leagueShortName: "World Cup",
    //     leagueType: 2,
    //     location: "",
    //     matchId: "237058126",
    //     matchTime: 1669046340,
    //     neutral: true,
    //     round: "Groups",
    //     season: "2022",
    //     stageId: "21534",
    //     status: 0,
    //     subLeagueId: "",
    //     subLeagueName: "",
    //     temperature: "",
    //     weather: "",
    //   },
    // ]);
  };

  const updatePhase = () => {
    if (match?.length === 48) setPhase("Fase de grupos");
    if (match?.length === 8) {
      setPhase("Octavos de final");
    }
    if (match?.length === 4) {
      setPhase("Cuartos de final");
    }
    if (match?.length === 2) {
      setPhase("Semi-finales");
    }
  };

  useEffect(() => {
    getMatches();
  }, []);

  useEffect(() => {
    updatePhase();
    console.log("PHASE:: ", phase);
  }, [updatePhase, match]);

  return (
    <div
      style={{
        background: "grey",
        width: "800px",
        padding: "40px",
        display: "flex",
        gap: "50px",
        overflowX: "auto",
        margin: "0 auto",
      }}
    >
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      {match?.map((obj, index) => {
        const jornada2 = 1669370400;
        const jornada3 = 1669734000;

        const jornada =
          obj.matchTime < jornada2 ? "1" : obj.matchTime < jornada3 ? "2" : "3";

        // predicciones.push({
        //   matchId: obj.matchId,
        //   results: {
        //     scoreHome: 3,
        //     AwayScore: 1,
        //   },
        // });

        const dateMoment = moment(obj.matchTime * 1000).format("lll");

        return (
          <Match
            key={index}
            index={index}
            jornada={jornada}
            date={dateMoment}
            setPredictions={setPredictions}
            funcionAddPredictions={funcionAddPredictions}
            // addQuiniela={addQuiniela}
            {...obj}
          />
        );
      })}
      <button type="submit" onClick={addQuiniela}>
        Guardar
      </button>
      {/* </form> */}
    </div>
  );
};

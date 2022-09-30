import { useContext, useEffect, useState } from "react";
// import axios from "axios";
import moment from "moment";
import { Match } from "./Match";
import { AuthContext } from "../context";
import { AxiosConfig } from "../utils";
import Swal from "sweetalert2";
import { useCallback } from "react";
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

export const Quiniela = () => {
  const { userAuth } = useContext(AuthContext);
  const [phase, setPhase] = useState("");
  const [match, setMatches] = useState([1, 1]);
  const [predictions, setPredictions] = useState([]);

  const getAllPredictions = useCallback(async () => {
    const TOKEN = userAuth;

    const response = await AxiosConfig.get("auth/private", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const userId = response.data.user._id;

    const res = await AxiosConfig.get(`prediction/findAll/${userId}`);

    setPredictions(res.data);
    for (const obj of res.data) {
      delete obj._id;
      delete obj.userId;
      delete obj.__v;
      // predictions = obj;
      // predictions.push(obj);
    }
  }, [userAuth]);

  useEffect(() => {
    getAllPredictions();
  }, [getAllPredictions]);

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

  // useEffect(() => {
  //   console.log(predictions);
  // }, [predictions]);

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  const getMatches = async () => {
    //   axios
    //     .get(
    //       "http://api.isportsapi.com/sport/football/schedule?api_key=7ysUHBwXouU3Bb48&leagueId=1572"
    //     )
    //     .then((res) => setMatches(res.data.data));

    /////para hacer pruebas con champions league
    // axios
    //   .get(
    //     "http://api.isportsapi.com/sport/football/schedule?api_key=7ysUHBwXouU3Bb48&leagueId=13014"
    //   )
    //   .then((res) => {
    //     const resultado = res.data.data.filter((obj) => obj.group != "");
    //     return setMatches(resultado);
    //   });
    // console.log(match);

    setMatches([
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
        status: 0,
        homeId: "904",
        homeName: "Qatar",
        awayId: "779",
        awayName: "Ecuador",
        homeScore: 0,
        awayScore: 0,
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
        status: 0,
        homeId: "744",
        homeName: "England",
        awayId: "783",
        awayName: "Iran",
        homeScore: 0,
        awayScore: 0,
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
        status: 0,
        homeId: "815",
        homeName: "Senegal",
        awayId: "646",
        awayName: "Netherlands",
        homeScore: 0,
        awayScore: 0,
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
        status: 0,
        homeId: "797",
        homeName: "USA",
        awayId: "7384",
        awayName: "Wales",
        homeScore: 0,
        awayScore: 0,
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
    ]);
  };

  const updatePhase = useCallback(() => {
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
  }, [match]);

  useEffect(() => {
    updatePhase();
  }, [updatePhase, match]);

  useEffect(() => {
    getMatches();
  }, []);

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
        const prediction = predictions.find((e) => e.matchId === obj.matchId);
        const jornada2 = 1669370400;
        const jornada3 = 1669734000;

        const jornada =
          obj.matchTime < jornada2 ? "1" : obj.matchTime < jornada3 ? "2" : "3";

        const dateMoment = moment(obj.matchTime * 1000).format("lll");

        return (
          <Match
            key={index}
            prediction={prediction}
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

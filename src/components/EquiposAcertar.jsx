import { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Match } from "./Match";
import { AxiosConfig } from "../utils/AxiosConfig";
import { AuthContext } from "../context";
// import { useForm } from "../hooks/useForm";

export const EquiposAcertar = () => {
  const { userAuth } = useContext(AuthContext);
  const [data, setData] = useState([]);
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
      phase: "Fase de Grupos",
      predictions,
    };

    const TOKEN = userAuth;
    const respuesta = await AxiosConfig.post("quiniela/create", body, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    console.log(respuesta);
  };

  useEffect(() => {
    console.log(predictions);
  }, [predictions]);
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
      .then((res) => setData(res.data.data));
  };

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
      {data?.map((obj, index) => {
        const jornada2 = 1669370400;
        const jornada3 = 1669734000;

        const jornada =
          obj.matchTime < jornada2 ? "1" : obj.matchTime < jornada3 ? "2" : "3";

        predicciones.push({
          matchId: obj.matchId,
          results: {
            scoreHome: 3,
            AwayScore: 1,
          },
        });

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

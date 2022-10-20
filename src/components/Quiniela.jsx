import { useCallback, useContext, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Save, Backspace as BackspaceIcon } from "@mui/icons-material";
import { AuthContext } from "../context";
import { AxiosConfig } from "../utils";
import { Match, MatchNothing } from "./";
import Swal from "sweetalert2";
import moment from "moment";
import "moment-timezone";
import "./quiniela.css";

moment.updateLocale("es", {
  months: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
});

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
// };//local

export const Quiniela = ({ arrayDePartidos, phase }) => {
  const { userAuth } = useContext(AuthContext);
  const [predictions, setPredictions] = useState([]);
  const [disabled, setDisabled] = useState(true);
  let dayMoment = "";

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

    // if (predictions.length === 0) {
    //   setPredictions([{ matchId: matchId, results: { [name]: value } }]);
    //   return;
    // }

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

    for (const prediction of predictions) {
      if (!!prediction?.results?.homeScore) {
        if (prediction?.results?.homeScore < 0) {
          return Swal.fire({
            title: "Verifica los goles que quieres acertar!",
            text: "Los goles deben ser números positivos",
            icon: "info",
            confirmButtonText: "Ok",
          });
        }
      }
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

  const deleteQuiniela = async () => {
    await Swal.fire({
      title: "¡Esta acción no se puede deshacer!",
      text: "Se borrarán tus predicciones de esta quiniela.",
      showCancelButton: true,
      confirmButtonText: "Limpiar",
      cancelButtonText: "Cancelar",
      icon: "warning",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await AxiosConfig.get("auth/private", {
          headers: {
            Authorization: `Bearer ${userAuth}`,
          },
        });
        const userId = response.data.user._id;
        const values = {
          userId: userId,
          phase: phase,
        };

        await AxiosConfig.post("quiniela/delete", values);
        setPredictions([]);
      } else if (result.isDenied) return;
    });
  };

  useEffect(() => {
    setPredictions([]);
    getAllPredictions(phase);
    document.getElementById("scrollTop").scrollTo(0, 0);
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
      id="scrollTop"
      className="container-quiniela custom-scrollbar"
      sx={{ bgcolor: "secondary.light" }}
    >
      {disabled && (
        <Box
          className="container-blocked-quiniela"
          sx={{
            alignItems: "center",
            justifyContent: "center",
            background: "rgb(102 102 102 / 45%)",
          }}
        >
          <Box
            className="container-message"
            sx={{
              bgcolor: "#ffffff94",
            }}
          >
            <Typography>Esta quiniela no está disponible</Typography>
          </Box>
        </Box>
      )}

      <Box
        component="form"
        className="form-quiniela"
        sx={{ bgcolor: "custom.flagCatar", minHeight: "100%" }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {arrayDePartidos?.map((obj, index) => {
          const prediction = predictions.find((e) => e.matchId === obj.matchId);
          const dateMoment = moment(obj.matchTime * 1000).format("LT");
          const dateMomentDay = moment(obj.matchTime * 1000).format("LL");
          let showDay = false;

          if (dayMoment !== dateMomentDay) {
            showDay = true;
            dayMoment = dateMomentDay;
          } else {
            showDay = false;
          }

          return (
            <div key={index}>
              {arrayDePartidos.length === 48 ? (
                <>
                  {showDay && (
                    <Typography
                      sx={{
                        margin: "15px 7px 0px",
                        color: "custom.text",
                        fontWeight: "100",
                      }}
                    >
                      {dayMoment}
                    </Typography>
                  )}

                  <Match
                    prediction={prediction}
                    index={index}
                    disabled={disabled}
                    date={dateMoment}
                    setPredictions={setPredictions}
                    onAddPredictions={onAddPredictions}
                    {...obj}
                  />
                </>
              ) : (
                <>
                  {showDay && (
                    <Typography
                      sx={{
                        margin: "15px 7px 0px",
                        color: "custom.text",
                        fontWeight: "100",
                      }}
                    >
                      {dayMoment}
                    </Typography>
                  )}
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
                </>
              )}
            </div>
          );
        })}
        <Box
          sx={{
            position: "sticky",
            bottom: "10px",
            left: "64%",
            flexDirection: "row",
            display: "flex",
            width: "max-content",
            gap: "9px",
            margin: "20px",
          }}
        >
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            disabled={disabled}
            onClick={deleteQuiniela}
            startIcon={<BackspaceIcon />}
          >
            Limpiar
          </Button>

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
      </Box>
    </Box>
  );
};

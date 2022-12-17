import { useCallback, useContext, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Save, Backspace as BackspaceIcon } from "@mui/icons-material";
import { AuthContext } from "../context";
import { AxiosConfig } from "../utils";
import { Match, MatchNothing } from "./";
import Swal from "sweetalert2";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  Grupos: { timeStart: 1668958200, timeEnd: 1670014800 },
  Octavos: { timeStart: 1670077800, timeEnd: 1670360400 },
  Cuartos: { timeStart: 1670596200, timeEnd: 1670706000 },
  Semifinales: { timeStart: 1670956200, timeEnd: 1671051600 },
  Final: { timeStart: 1671373800, timeEnd: 1671382800 },
};

export const Quiniela = ({ arrayDePartidos, phase }) => {
  const { userAuth } = useContext(AuthContext);
  const [predictions, setPredictions] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [disabledButton, setDisabledButton] = useState(true);
  let dayMoment = "";

  const notify = (message) =>
    toast.error(message, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      icon: false,
      theme: "light",
    });

  const getAllPredictions = useCallback(
    async (phase) => {
      try {
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
      } catch (error) {
        notify("No se pudo obtener tus predicciones de la Base de Datos");
      }
    },
    [userAuth]
  );

  const onAddPredictions = (target, matchId) => {
    const { name, value } = target.target;

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
    try {
      setDisabledButton(true);
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
        setDisabledButton(false);
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
        setDisabledButton(false);
      }
    } catch (error) {
      notify("No se pudo agregar tus predicciones. Intentalo de nuevo");
      setDisabledButton(false);
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
      try {
        setDisabledButton(true);
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
          setDisabledButton(false);
        } else if (result.isDenied) {
          return;
        }
        setDisabledButton(false);
      } catch (error) {
        notify("No se pudo eliminar tus predicciones. Intentalo de nuevo");
        setDisabledButton(false);
      }
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
        // boolean = timeNow >= phases.Grupos.timeStart;
        boolean = timeNow >= 1669087800;
        setDisabled(boolean);
        setDisabledButton(boolean);
        break;
      case "Octavos":
        boolean =
          timeNow < phases.Grupos?.timeEnd ||
          timeNow > phases.Octavos?.timeStart;
        setDisabled(boolean);
        setDisabledButton(boolean);
        break;
      case "Cuartos":
        boolean =
          timeNow < phases.Octavos?.timeEnd ||
          timeNow > phases.Cuartos?.timeStart;
        setDisabled(boolean);
        setDisabledButton(boolean);

        break;
      case "Semifinales":
        boolean =
          timeNow < phases.Cuartos?.timeEnd ||
          timeNow > phases.Semifinales?.timeStart;
        setDisabled(boolean);
        setDisabledButton(boolean);

        break;
      case "Final":
        boolean =
          timeNow < phases.Semifinales?.timeEnd ||
          timeNow > phases.Final?.timeStart;
        setDisabled(boolean);
        setDisabledButton(boolean);
        break;

      default:
        setDisabled(true);
        setDisabledButton(true);
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
        <Box className="container-blocked-quiniela">
          <Box className="container-blocked-message">
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
            sx={{
              color: "#f4f4f4",
              bgcolor: "#0e588d",
            }}
            disabled={disabledButton}
            onClick={deleteQuiniela}
            startIcon={<BackspaceIcon />}
          >
            Limpiar
          </Button>

          <Button
            variant="contained"
            type="submit"
            color="secondary"
            sx={{
              color: "#f4f4f4",
              bgcolor: "#0e588d",
            }}
            disabled={disabledButton}
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

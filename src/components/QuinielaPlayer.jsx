import { useCallback, useContext, useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import { AuthContext } from "../context";
import { AxiosConfig } from "../utils";
import moment from "moment";
import "moment-timezone";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./quinielaPlayer.css";

export const QuinielaPlayer = () => {
  const { userAuth } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [player, setPlayer] = useState({});
  const [playerName, setPlayerName] = useState("");
  const [disabled, setDisabled] = useState(true);

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

  const addPlayer = async () => {
    try {
      if (!!player?.playerName < 1 || !!player?.goals < 1)
        return Swal.fire({
          title: "Hay campos vacios!",
          text: "Los campos deben estar llenos",
          icon: "info",
          confirmButtonText: "Ok",
        });

      const TOKEN = userAuth;

      const res = await AxiosConfig.get("auth/private", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const userId = res.data.user._id;

      const { data } = await AxiosConfig.get(
        `player/findOneByUserId/${userId}`
      );

      if (!!data) {
        // actualizar player
        const goals = Number(player.goals);
        const playerName = player.playerName;

        const body = {
          playerName,
          goals,
        };

        await AxiosConfig.put(`player/${data._id}`, body, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });

        Swal.fire({
          title: "Listo!",
          text: "Tu predicción se ha actualizado correctamente.",
          icon: "success",
          confirmButtonText: "Ok",
        });
      } else {
        const goals = Number(player.goals);
        const playerName = player.playerName;

        const body = {
          playerName,
          goals,
        };

        await AxiosConfig.post("player/create", body, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });

        Swal.fire({
          title: "Listo!",
          text: "Tu predicción se ha creado correctamente.",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      notify("No se pudo agregar tu predicción!");
    }
  };

  const returnDefaultValue = useCallback(() => {
    if (!!player?.playerName) {
      for (let index = 0; index < data?.length; index++) {
        if (data[index].playerName === player?.playerName) {
          return index;
        } else {
          continue;
        }
      }
    } else {
      return false;
    }
  }, [player, data]);

  const onAddPlayer = (value, key) => {
    setPlayer((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getPlayer = useCallback(async () => {
    try {
      const TOKEN = userAuth;

      const response = await AxiosConfig.get("auth/private", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const userId = response.data.user._id;

      const { data } = await AxiosConfig.get(
        `player/findOneByUserId/${userId}`
      );
      if (!!data === false) return;
      delete data.userId;
      delete data.__v;
      delete data._id;

      setPlayer(data);
    } catch (error) {
      notify("No se pudo obtener tu predicción de la Base de Datos");
    }
  }, [userAuth]);

  const getPlayersFromApi = useCallback(async () => {
    try {
      const results = await axios.get(
        "https://quiniela-backend.vercel.app/prediction/getPlayersFromApi"
      );
      const playersSort = results.data.data.sort((a, b) =>
        a.playerName.localeCompare(b.playerName)
      );
      setData(playersSort);
    } catch (error) {
      notify("No se pudo obtener los Jugadores, Intenta más tarde!");
    }
  }, []);

  useEffect(() => {
    getPlayersFromApi();
    getPlayer();
  }, [getPlayer, getPlayersFromApi]);

  useEffect(() => {
    if (data?.length > 0) {
      setPlayerName(data[returnDefaultValue()]);
    }
  }, [returnDefaultValue, player, setPlayerName, data]);

  useEffect(() => {
    const dateUtc = moment.utc();
    const timeNow = moment
      .tz(dateUtc, "YYYY-MM-DD h:mm a", "America/Caracas")
      .unix();

    let boolean = timeNow < 1671051600 || timeNow > 1671282000;

    setDisabled(boolean);
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "secondary.light",
        overflow: "auto",
        height: "100%",
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
        <Box className="container-blocked-quiniela">
          <Box className="container-blocked-message">
            <Typography>Esta quiniela no está disponible</Typography>
          </Box>
        </Box>
      )}

      <Box
        className="form-quiniela-player"
        component="form"
        sx={{ bgcolor: "custom.flagCatar" }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Box
          className="container-big-quiniela-player"
          sx={{ bgcolor: "secondary.main" }}
        >
          <Box className="container-quiniela-player">
            <Typography style={{ padding: 0, margin: 0, fontSize: "1rem" }}>
              Elige el goleador del Mundial
            </Typography>
          </Box>
          <Box className="container-inputs" sx={{ bgcolor: "primary.main" }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={data}
              sx={{ width: "70%", minWidth: "230px" }}
              value={playerName || null}
              disabled={disabled}
              color="secondary"
              getOptionLabel={(option) => option.playerName}
              onInputChange={(e, value) => onAddPlayer(value, "playerName")}
              isOptionEqualToValue={(option, value) =>
                option.playerName === value.playerName
              }
              renderInput={(params) => (
                <TextField
                  type="text"
                  name="playerName"
                  required={true}
                  color="secondary"
                  {...params}
                  label="Goleador del Mundial"
                />
              )}
            />
            <TextField
              id="outlined-number"
              label="Goles"
              name="goals"
              type="number"
              color="secondary"
              onChange={(e) => onAddPlayer(e.target.value, "goals")}
              required={true}
              disabled={disabled}
              InputProps={{
                inputProps: {
                  min: 1,
                  onKeyDown: (e) =>
                    ["e", "E", "+", "-", "."].includes(e.key) &&
                    e.preventDefault(),
                  value: player?.goals || "",
                },
              }}
            />
          </Box>
        </Box>
        <Button
          variant="contained"
          type="submit"
          color="secondary"
          disabled={disabled}
          onClick={addPlayer}
          startIcon={<Save />}
          sx={{
            width: "120px",
            position: "sticky",
            bottom: "10px",
            left: "100%",
            color: "#f4f4f4",
            bgcolor: "#0e588d",
          }}
        >
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

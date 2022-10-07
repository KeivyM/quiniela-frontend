// import * as React from "react";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";

import { Button } from "@mui/material";
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context";
import { AxiosConfig } from "../utils";

// export const SelectPlayer = ({ disabled }) => {
//   return (
//     <>
//       <Autocomplete
//         disablePortal
//         id="combo-box-demo"
//         options={top100Films}
//         sx={{ width: 300 }}
//         disabled={disabled}
//         renderInput={(params) => (
//           <TextField
//             required={true}
//             {...params}
//             label="Jugador"
//             InputProps={{ inputProps: { value: "Hola" } }}
//           />
//         )}
//       />
//       <TextField
//         id="outlined-number"
//         label="Goles"
//         type="number"
//         InputLabelProps={{
//           shrink: true,
//         }}
//         required={true}
//         disabled={disabled}
//         InputProps={{ inputProps: { min: 1, value: 5 } }}
//       />
//     </>
//   );
// };

// const top100Films = [
//   { label: "Lionel Messi", year: 1994 },
//   { label: "Cristiano Ronaldo", year: 1972 },
//   { label: "Robert Lewandowski", year: 1974 },
// ];

export const SelectPlayer = ({ disabled }) => {
  const { userAuth } = useContext(AuthContext);
  const [player, setPlayer] = useState({ name: "", goals: "" });

  const addPlayer = async () => {
    if (disabled) return console.log("No ha terminado la fase anterior");

    if (!!player?.name < 1 || !!player?.goals < 1)
      return Swal.fire({
        title: "Hay campos vacios!",
        text: "Toda la quiniela debe estar llena",
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

    const { data } = await AxiosConfig.get(`player/findOneByUserId/${userId}`);

    if (!!data) {
      // actualizar player
      const goals = Number(player.goals);
      const name = player.name;

      const body = {
        name,
        goals,
      };

      await axios.put(`http://localhost:3000/player/${data._id}`, body, {
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
      const name = player.name;

      const body = {
        name,
        goals,
      };

      await axios.post("http://localhost:3000/player/create", body, {
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

  const onAddPlayer = (target) => {
    const { name, value } = target.target;
    setPlayer({ ...player, [name]: value });
  };

  const getPlayer = useCallback(async () => {
    const TOKEN = userAuth;

    const response = await AxiosConfig.get("auth/private", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const userId = response.data.user._id;

    const { data } = await AxiosConfig.get(`player/findOneByUserId/${userId}`);

    if (!!data === false) return;
    delete data.userId;
    delete data.__v;
    delete data._id;
    setPlayer(data);
  }, [userAuth]);

  useEffect(() => {
    getPlayer();
  }, [getPlayer]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="text"
        placeholder="Jugador del Mundial"
        value={player.name}
        name="name"
        required={true}
        onChange={(e) => onAddPlayer(e)}
      />
      <input
        type="number"
        onChange={onAddPlayer}
        placeholder="Goles"
        name="goals"
        min={1}
        required={true}
        value={player?.goals}
      />
      <Button variant="contained" onClick={addPlayer}>
        Enviar
      </Button>
    </form>
  );
};

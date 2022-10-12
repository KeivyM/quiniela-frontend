import { useCallback, useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import { AuthContext } from "../context";
import { AxiosConfig } from "../utils";
import Swal from "sweetalert2";
import axios from "axios";

export const QuinielaPlayer = ({ disabled }) => {
  const { userAuth } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [player, setPlayer] = useState({});
  const [playerName, setPlayerName] = useState("");

  const addPlayer = async () => {
    if (disabled) return console.log("No ha terminado la fase anterior");

    if (!!player?.playerName < 1 || !!player?.goals < 1)
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
  };

  const returnDefaultValue = useCallback(() => {
    if (!!player?.playerName) {
      for (let index = 0; index < data.length; index++) {
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

  const getPlayersFromApi = async () => {
    //Cambiar Api Y leagueId
    try {
      const results = await axios.get(
        `http://api.isportsapi.com/sport/football/topscorer?api_key=EGlD1j0CeqDo3hcr&leagueId=13014`
      );
      setData(results.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlayersFromApi();
    getPlayer();
  }, [getPlayer]);

  useEffect(() => {
    if (data?.length > 0) {
      setPlayerName(data[returnDefaultValue()]);
    }
  }, [returnDefaultValue, player, setPlayerName, data]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={data}
        sx={{ width: 300 }}
        value={playerName || null}
        disabled={disabled}
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
        onChange={(e) => onAddPlayer(e.target.value, "goals")}
        required={true}
        disabled={disabled}
        InputProps={{ inputProps: { min: 1, value: player?.goals || "" } }}
      />

      <Button
        variant="contained"
        type="submit"
        disabled={disabled}
        onClick={addPlayer}
      >
        Enviar
      </Button>
    </form>
  );
};

// const data = [
//   {
//     playerId: "150860",
//     playerName: "Erling Haaland",
//     teamId: "26",
//     teamName: "Manchester City",
//     country: "Norway",
//     goalsCount: 5,
//     homeGoals: 3,
//     awayGoals: 2,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "120561",
//     playerName: "Leroy Sane",
//     teamId: "88",
//     teamName: "Bayern Munchen",
//     country: "Germany",
//     goalsCount: 4,
//     homeGoals: 3,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "168137",
//     playerName: "Giacomo Raspadori",
//     teamId: "1419",
//     teamName: "Napoli",
//     country: "Italy",
//     goalsCount: 3,
//     homeGoals: 0,
//     awayGoals: 3,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 1,
//   },
//   {
//     playerId: "103092",
//     playerName: "Piotr Zielinski",
//     teamId: "1419",
//     teamName: "Napoli",
//     country: "Poland",
//     goalsCount: 3,
//     homeGoals: 2,
//     awayGoals: 1,
//     homePenalty: 1,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "171424",
//     playerName: "Mohammed Kudus",
//     teamId: "253",
//     teamName: "AFC Ajax",
//     country: "Ghana",
//     goalsCount: 3,
//     homeGoals: 2,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "178042",
//     playerName: "Jude Bellingham",
//     teamId: "99",
//     teamName: "Borussia Dortmund",
//     country: "England",
//     goalsCount: 3,
//     homeGoals: 1,
//     awayGoals: 2,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "165972",
//     playerName: "Noah Okafor",
//     teamId: "9",
//     teamName: "Red Bull Salzburg",
//     country: "Switzerland",
//     goalsCount: 3,
//     homeGoals: 2,
//     awayGoals: 1,
//     homePenalty: 1,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "60961",
//     playerName: "Robert Lewandowski",
//     teamId: "84",
//     teamName: "FC Barcelona",
//     country: "Poland",
//     goalsCount: 3,
//     homeGoals: 3,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "144812",
//     playerName: "Kylian Mbappe Lottin",
//     teamId: "271",
//     teamName: "Paris Saint Germain (PSG)",
//     country: "France",
//     goalsCount: 3,
//     homeGoals: 2,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "196127",
//     playerName: "Ferran Jutgla Blanch",
//     teamId: "148",
//     teamName: "Club Brugge",
//     country: "Spain",
//     goalsCount: 2,
//     homeGoals: 1,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 1,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "198068",
//     playerName: "Mykhailo Mudryk",
//     teamId: "716",
//     teamName: "FC Shakhtar Donetsk",
//     country: "Ukraine",
//     goalsCount: 2,
//     homeGoals: 1,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "153244",
//     playerName: "Vinicius Jose Paixao de Oliveira Junior",
//     teamId: "82",
//     teamName: "Real Madrid",
//     country: "Brazil",
//     goalsCount: 2,
//     homeGoals: 1,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "24067",
//     playerName: "Lionel Andres Messi",
//     teamId: "271",
//     teamName: "Paris Saint Germain (PSG)",
//     country: "Argentina",
//     goalsCount: 2,
//     homeGoals: 0,
//     awayGoals: 2,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "115999",
//     playerName: "Giovanni Pablo Simeone",
//     teamId: "1419",
//     teamName: "Napoli",
//     country: "Argentina",
//     goalsCount: 2,
//     homeGoals: 1,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 2,
//   },
//   {
//     playerId: "164379",
//     playerName: "Alexis Saelemaekers",
//     teamId: "150",
//     teamName: "AC Milan",
//     country: "Belgium",
//     goalsCount: 2,
//     homeGoals: 1,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 0,
//   },
//   {
//     playerId: "101663",
//     playerName: "Adrien Rabiot",
//     teamId: "166",
//     teamName: "Juventus",
//     country: "France",
//     goalsCount: 2,
//     homeGoals: 2,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 0,
//   },
//   {
//     playerId: "118207",
//     playerName: "Andre Silva",
//     teamId: "13201",
//     teamName: "RB Leipzig",
//     country: "Portugal",
//     goalsCount: 2,
//     homeGoals: 2,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 1,
//   },
//   {
//     playerId: "134493",
//     playerName: "Maryan Shved",
//     teamId: "716",
//     teamName: "FC Shakhtar Donetsk",
//     country: "Ukraine",
//     goalsCount: 2,
//     homeGoals: 0,
//     awayGoals: 2,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "86050",
//     playerName: "Mislav Orsic",
//     teamId: "653",
//     teamName: "Dinamo Zagreb",
//     country: "Croatia",
//     goalsCount: 2,
//     homeGoals: 1,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "100443",
//     playerName: "Mohamed Salah Ghaly",
//     teamId: "25",
//     teamName: "Liverpool",
//     country: "Egypt",
//     goalsCount: 2,
//     homeGoals: 2,
//     awayGoals: 0,
//     homePenalty: 1,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "146547",
//     playerName: "Francisco Trincao",
//     teamId: "466",
//     teamName: "Sporting CP",
//     country: "Portugal",
//     goalsCount: 2,
//     homeGoals: 0,
//     awayGoals: 2,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "138918",
//     playerName: "Richarlison de Andrade",
//     teamId: "33",
//     teamName: "Tottenham Hotspur",
//     country: "Brazil",
//     goalsCount: 2,
//     homeGoals: 2,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "103915",
//     playerName: "Raphael Guerreiro",
//     teamId: "99",
//     teamName: "Borussia Dortmund",
//     country: "Portugal",
//     goalsCount: 2,
//     homeGoals: 1,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "170717",
//     playerName: "Kamal Sowah",
//     teamId: "148",
//     teamName: "Club Brugge",
//     country: "Ghana",
//     goalsCount: 2,
//     homeGoals: 1,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "135853",
//     playerName: "Andre Zambo Anguissa",
//     teamId: "1419",
//     teamName: "Napoli",
//     country: "Cameroon",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "172901",
//     playerName: "Khvicha Kvaratskhelia",
//     teamId: "1419",
//     teamName: "Napoli",
//     country: "Georgia",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "78745",
//     playerName: "Steven Berghuis",
//     teamId: "253",
//     teamName: "AFC Ajax",
//     country: "Netherlands",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "145064",
//     playerName: "Marcus Edwards",
//     teamId: "466",
//     teamName: "Sporting CP",
//     country: "England",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "80902",
//     playerName: "Neymar da Silva Santos Junior",
//     teamId: "271",
//     teamName: "Paris Saint Germain (PSG)",
//     country: "Brazil",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "145273",
//     playerName: "Tanguy Ndombele Alvaro",
//     teamId: "1419",
//     teamName: "Napoli",
//     country: "France",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 2,
//   },
//   {
//     playerId: "161804",
//     playerName: "Ferran Torres",
//     teamId: "84",
//     teamName: "FC Barcelona",
//     country: "Spain",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 2,
//   },
//   {
//     playerId: "105028",
//     playerName: "Joao Paulo Dias Fernandes",
//     teamId: "466",
//     teamName: "Sporting CP",
//     country: "Portugal",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 3,
//   },
//   {
//     playerId: "145330",
//     playerName: "Amine Harit",
//     teamId: "211",
//     teamName: "Marseille",
//     country: "Morocco",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 2,
//   },
//   {
//     playerId: "154969",
//     playerName: "Andreas Skov Olsen",
//     teamId: "148",
//     teamName: "Club Brugge",
//     country: "Denmark",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 0,
//   },
//   {
//     playerId: "101117",
//     playerName: "Riyad Mahrez",
//     teamId: "26",
//     teamName: "Manchester City",
//     country: "Algeria",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 1,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 1,
//   },
//   {
//     playerId: "30565",
//     playerName: "Marco Reus",
//     teamId: "99",
//     teamName: "Borussia Dortmund",
//     country: "Germany",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 0,
//   },
//   {
//     playerId: "161244",
//     playerName: "Rodrygo Silva De Goes",
//     teamId: "82",
//     teamName: "Real Madrid",
//     country: "Brazil",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 1,
//   },
//   {
//     playerId: "119097",
//     playerName: "Julian Brandt",
//     teamId: "99",
//     teamName: "Borussia Dortmund",
//     country: "Germany",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 0,
//   },
//   {
//     playerId: "64796",
//     playerName: "Pierre-Emerick Aubameyang",
//     teamId: "24",
//     teamName: "Chelsea",
//     country: "Gabon",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "27125",
//     playerName: "Edin Dzeko",
//     teamId: "152",
//     teamName: "Inter Milan",
//     country: "Bosnia-Herzegovina",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 1,
//   },
//   {
//     playerId: "84385",
//     playerName: "Raheem Sterling",
//     teamId: "24",
//     teamName: "Chelsea",
//     country: "England",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "99201",
//     playerName: "Sadio Mane",
//     teamId: "88",
//     teamName: "Bayern Munchen",
//     country: "Senegal",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "175093",
//     playerName: "Mohamed Simakan",
//     teamId: "13201",
//     teamName: "RB Leipzig",
//     country: "France",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "29326",
//     playerName: "Tjaronn Chery",
//     teamId: "607",
//     teamName: "Maccabi Haifa",
//     country: "Suriname",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "116575",
//     playerName: "Alex Grimaldo",
//     teamId: "463",
//     teamName: "Benfica",
//     country: "Spain",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "123617",
//     playerName: "Reece James",
//     teamId: "24",
//     teamName: "Chelsea",
//     country: "England",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "153911",
//     playerName: "Santiago Federico Valverde Dipetta",
//     teamId: "82",
//     teamName: "Real Madrid",
//     country: "Uruguay",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "153177",
//     playerName: "Arthur Gomes",
//     teamId: "466",
//     teamName: "Sporting CP",
//     country: "Brazil",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 1,
//     subNum: 1,
//   },
//   {
//     playerId: "212835",
//     playerName: "Antonio Eromonsele Nordby Nusa",
//     teamId: "148",
//     teamName: "Club Brugge",
//     country: "Norway",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 2,
//   },
//   {
//     playerId: "27008",
//     playerName: "Eric Maxim Choupo-Moting",
//     teamId: "88",
//     teamName: "Bayern Munchen",
//     country: "Cameroon",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 1,
//     subNum: 1,
//   },
//   {
//     playerId: "119973",
//     playerName: "Marco Asensio Willemsen",
//     teamId: "82",
//     teamName: "Real Madrid",
//     country: "Spain",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 3,
//   },
//   {
//     playerId: "172275",
//     playerName: "Lassina Traore",
//     teamId: "716",
//     teamName: "FC Shakhtar Donetsk",
//     country: "Burkina Faso",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 3,
//   },
//   {
//     playerId: "28879",
//     playerName: "Eden Hazard",
//     teamId: "82",
//     teamName: "Real Madrid",
//     country: "Belgium",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 1,
//     subNum: 1,
//   },
//   {
//     playerId: "167577",
//     playerName: "Karim Adeyemi",
//     teamId: "99",
//     teamName: "Borussia Dortmund",
//     country: "Germany",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 1,
//   },
//   {
//     playerId: "179232",
//     playerName: "Tommaso Pobega",
//     teamId: "150",
//     teamName: "AC Milan",
//     country: "Italy",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 3,
//   },
//   {
//     playerId: "139185",
//     playerName: "Dean David",
//     teamId: "607",
//     teamName: "Maccabi Haifa",
//     country: "Israel",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 2,
//   },
//   {
//     playerId: "82034",
//     playerName: "John Stones",
//     teamId: "26",
//     teamName: "Manchester City",
//     country: "England",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 1,
//     subNum: 0,
//   },
//   {
//     playerId: "117539",
//     playerName: "Franck Kessie",
//     teamId: "84",
//     teamName: "FC Barcelona",
//     country: "Cote D Ivoire",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 2,
//   },
//   {
//     playerId: "150245",
//     playerName: "Phil Foden",
//     teamId: "26",
//     teamName: "Manchester City",
//     country: "England",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 1,
//   },
//   {
//     playerId: "136177",
//     playerName: "Mario Hermoso Canseco",
//     teamId: "109",
//     teamName: "Atletico Madrid",
//     country: "Spain",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 1,
//   },
//   {
//     playerId: "106101",
//     playerName: "Serge Gnabry",
//     teamId: "88",
//     teamName: "Bayern Munchen",
//     country: "Germany",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 2,
//   },
//   {
//     playerId: "175647",
//     playerName: "Wesley Fofana",
//     teamId: "24",
//     teamName: "Chelsea",
//     country: "France",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 0,
//   },
//   {
//     playerId: "116026",
//     playerName: "Matteo Politano",
//     teamId: "1419",
//     teamName: "Napoli",
//     country: "Italy",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 1,
//     matchNum: 2,
//     subNum: 0,
//   },
//   {
//     playerId: "116358",
//     playerName: "Chancel Mbemba Mangulu",
//     teamId: "211",
//     teamName: "Marseille",
//     country: "Democratic Rep Congo",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 0,
//   },
//   {
//     playerId: "96170",
//     playerName: "Arkadiusz Milik",
//     teamId: "166",
//     teamName: "Juventus",
//     country: "Poland",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 0,
//   },
//   {
//     playerId: "170580",
//     playerName: "Julian Alvarez",
//     teamId: "26",
//     teamName: "Manchester City",
//     country: "Argentina",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 2,
//   },
//   {
//     playerId: "78416",
//     playerName: "Antoine Griezmann",
//     teamId: "109",
//     teamName: "Atletico Madrid",
//     country: "France",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 2,
//   },
//   {
//     playerId: "142995",
//     playerName: "Nuno Santos",
//     teamId: "466",
//     teamName: "Sporting CP",
//     country: "Portugal",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 1,
//   },
//   {
//     playerId: "28696",
//     playerName: "Alexis Alejandro Sanchez",
//     teamId: "211",
//     teamName: "Marseille",
//     country: "Chile",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 0,
//   },
//   {
//     playerId: "124263",
//     playerName: "Jan Sykora",
//     teamId: "2534",
//     teamName: "FC Viktoria Plzen",
//     country: "Czech",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 0,
//   },
//   {
//     playerId: "25358",
//     playerName: "Luka Modric",
//     teamId: "82",
//     teamName: "Real Madrid",
//     country: "Croatia",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 0,
//   },
//   {
//     playerId: "146749",
//     playerName: "Youssef En-Nesyri",
//     teamId: "86",
//     teamName: "Sevilla",
//     country: "Morocco",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 0,
//   },
//   {
//     playerId: "117850",
//     playerName: "Lucas Hernandez",
//     teamId: "88",
//     teamName: "Bayern Munchen",
//     country: "France",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 0,
//   },
//   {
//     playerId: "134285",
//     playerName: "Denzel Dumfries",
//     teamId: "152",
//     teamName: "Inter Milan",
//     country: "Netherlands",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 1,
//   },
//   {
//     playerId: "150612",
//     playerName: "Wenderson Galeno",
//     teamId: "468",
//     teamName: "FC Porto",
//     country: "Brazil",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 1,
//   },
//   {
//     playerId: "146446",
//     playerName: "Ruben Dias",
//     teamId: "26",
//     teamName: "Manchester City",
//     country: "Portugal",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 2,
//     subNum: 0,
//   },
//   {
//     playerId: "96450",
//     playerName: "Hakan Calhanoglu",
//     teamId: "152",
//     teamName: "Inter Milan",
//     country: "Turkey",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 1,
//   },
//   {
//     playerId: "178204",
//     playerName: "Zaidu Sanusi",
//     teamId: "468",
//     teamName: "FC Porto",
//     country: "Nigeria",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 1,
//   },
//   {
//     playerId: "66461",
//     playerName: "Olivier Giroud",
//     teamId: "150",
//     teamName: "AC Milan",
//     country: "France",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 1,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "133867",
//     playerName: "Oleksandr Zubkov",
//     teamId: "716",
//     teamName: "FC Shakhtar Donetsk",
//     country: "Ukraine",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "168332",
//     playerName: "Leonardo Balerdi",
//     teamId: "211",
//     teamName: "Marseille",
//     country: "Argentina",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 1,
//   },
//   {
//     playerId: "60856",
//     playerName: "Joel Matip",
//     teamId: "25",
//     teamName: "Liverpool",
//     country: "Cameroon",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 1,
//   },
//   {
//     playerId: "153421",
//     playerName: "Weston Mckennie",
//     teamId: "166",
//     teamName: "Juventus",
//     country: "USA",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 1,
//   },
//   {
//     playerId: "109253",
//     playerName: "Robert Andrich",
//     teamId: "165",
//     teamName: "Bayer Leverkusen",
//     country: "Germany",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "147622",
//     playerName: "David Neres Campos",
//     teamId: "463",
//     teamName: "Benfica",
//     country: "Brazil",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "168304",
//     playerName: "Jesper Lindstrom",
//     teamId: "423",
//     teamName: "Eintracht Frankfurt",
//     country: "Denmark",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "225688",
//     playerName: "Abakar Sylla",
//     teamId: "148",
//     teamName: "Club Brugge",
//     country: "",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "143279",
//     playerName: "Dusan Vlahovic",
//     teamId: "166",
//     teamName: "Juventus",
//     country: "Serbia",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "95598",
//     playerName: "Joao Mario",
//     teamId: "463",
//     teamName: "Benfica",
//     country: "Portugal",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 1,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "115258",
//     playerName: "Rafael Ferreira Silva",
//     teamId: "463",
//     teamName: "Benfica",
//     country: "Portugal",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "154647",
//     playerName: "Joao Pedro Neves Filipe",
//     teamId: "70",
//     teamName: "Celtic FC",
//     country: "Portugal",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "126824",
//     playerName: "Steven Bergwijn",
//     teamId: "253",
//     teamName: "AFC Ajax",
//     country: "Netherlands",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "96746",
//     playerName: "Andres Mateus Uribe Villa",
//     teamId: "468",
//     teamName: "FC Porto",
//     country: "Colombia",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 1,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "161537",
//     playerName: "Giovanni Di Lorenzo",
//     teamId: "1419",
//     teamName: "Napoli",
//     country: "Italy",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "151072",
//     playerName: "Edson Omar Alvarez Velazquez",
//     teamId: "253",
//     teamName: "AFC Ajax",
//     country: "Mexico",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "162774",
//     playerName: "Moussa Diaby",
//     teamId: "165",
//     teamName: "Bayer Leverkusen",
//     country: "France",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "134153",
//     playerName: "Christopher Nkunku",
//     teamId: "13201",
//     teamName: "RB Leipzig",
//     country: "France",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "145108",
//     playerName: "Trent Arnold",
//     teamId: "25",
//     teamName: "Liverpool",
//     country: "England",
//     goalsCount: 1,
//     homeGoals: 1,
//     awayGoals: 0,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
//   {
//     playerId: "159607",
//     playerName: "Luis Fernando Diaz Marulanda",
//     teamId: "25",
//     teamName: "Liverpool",
//     country: "Colombia",
//     goalsCount: 1,
//     homeGoals: 0,
//     awayGoals: 1,
//     homePenalty: 0,
//     awayPenalty: 0,
//     matchNum: 3,
//     subNum: 0,
//   },
// ];

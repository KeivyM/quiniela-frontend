// import { useForm } from "../hooks/useForm";
import { getFlagAway, getFlagHome } from "../utils/codeFlags";
// import { flags } from "../utils/codeFlags";

export const Match = (data) => {
  // const { searchText, onInputChange } = useForm({});
  const {
    group,
    date,
    jornada,
    homeName,
    awayName,
    // setPredictions,
    matchId,
    // index,
    funcionAddPredictions,
  } = data;
  // console.log(data.matchId);

  // const funcionAddPredictions = (e) => {
  //   const { name, value } = target;
  //       setPredictions({
  //     ...formState,
  //     [name]: value,
  //       })

  // (()=> )
  // console.log(e);
  // };

  // const getFlagAway = () => {
  //   const flag = flags.find(
  //     (elemento) => elemento.name === awayName && elemento.abv
  //   );
  //   return flag?.abv;
  // };

  // const getFlagHome = () => {
  //   const flag = flags.find(
  //     (elemento) => elemento.name === homeName && elemento.abv
  //   );
  //   return flag?.abv;
  // };

  return (
    <div>
      <h3>
        Grupo {group}. {date}. Jornada {jornada} / 3
      </h3>

      <div
        style={{
          background: "#ccc",
          display: "flex",
          justifyContent: "space-around",
          width: "400px",
          height: "100px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <img
            src={`https://cdn.sportmonks.com/images/countries/png/short/${getFlagHome(
              homeName
            )}.png`}
            width={60}
            height={30}
            alt="flag"
            style={{
              border: "1px solid",
              borderRadius: "5px",
              margin: "0 auto",
            }}
          />

          <span>{homeName}</span>
          <input
            type="number"
            name="homeScore"
            min={0}
            // defaultValue={0}
            max={20}
            onChange={(e) => funcionAddPredictions(e, matchId)}
            // {...register(data.matchId.toString())}
          />
        </div>
        vs
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <img
            src={`https://cdn.sportmonks.com/images/countries/png/short/${getFlagAway(
              awayName
            )}.png`}
            width={60}
            height={30}
            alt="flag"
            style={{
              border: "1px solid",
              borderRadius: "5px",
              margin: "0 auto",
            }}
          />
          <span>{awayName}</span>
          <input
            type="number"
            name="awayScore"
            min={0}
            max={20}
            onChange={(e) => funcionAddPredictions(e, matchId)}
          />
        </div>
      </div>
    </div>
  );
};

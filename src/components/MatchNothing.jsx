import { useEffect } from "react";
import { getFlagAway, getFlagHome } from "../utils/codeFlags";

export const MatchNothing = (data) => {
  const {
    index,
    group,
    phase,
    date,
    homeName,
    awayName,
    matchId,
    prediction,
    onAddPredictions,
  } = data;
  // const { results } = prediction;

  const octavos = [
    {
      homeName: "1A",
      awayName: "2B",
    },
    {
      homeName: "1C",
      awayName: "2D",
    },
    {
      homeName: "1D",
      awayName: "2C",
    },
    {
      homeName: "1B",
      awayName: "2A",
    },
    {
      homeName: "1E",
      awayName: "2F",
    },
    {
      homeName: "1G",
      awayName: "2H",
    },
    {
      homeName: "1F",
      awayName: "2E",
    },
    {
      homeName: "1H",
      awayName: "2G",
    },
  ];

  const cuartos = [
    {
      homeName: "Ganador octavos 5",
      awayName: "Ganador octavos 6",
    },
    {
      homeName: "Ganador octavos 1",
      awayName: "Ganador octavos 2",
    },
    {
      homeName: "Ganador octavos 7",
      awayName: "Ganador octavos 8",
    },
    {
      homeName: "Ganador octavos 3",
      awayName: "Ganador octavos4",
    },
  ];

  const semifinales = [
    {
      homeName: "Ganador cuartos de final 1",
      awayName: "Ganador cuartos de final 2",
    },
    {
      homeName: "Ganador cuartos de final 3",
      awayName: "Ganador cuartos de final 4",
    },
  ];

  const final = [
    {
      homeName: "Perdedor semifinal 1",
      awayName: "perdedor semifinal 2",
    },
    {
      homeName: "Ganador semifinal 1",
      awayName: "Ganador semifinal 2",
    },
  ];

  return (
    <div style={{ border: "1px solid", marginBottom: "2px", padding: "15px" }}>
      <h3>{date}.</h3>

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
            src={`https://www.fundaciontabitafeyes.org/wp-content/themes/childcare/images/default.png`}
            width={60}
            height={30}
            alt="flag"
            style={{
              border: "1px solid",
              borderRadius: "5px",
              margin: "0 auto",
            }}
          />

          <span>
            {phase === "cuartos"
              ? cuartos[index]?.homeName
              : phase === "octavos"
              ? octavos[index]?.homeName
              : phase === "semifinales"
              ? semifinales[index]?.homeName
              : phase === "final"
              ? final[index]?.homeName
              : ""}
          </span>
          <input
            type="number"
            name="homeScore"
            min={0}
            // defaultValue={0}
            max={50}
            value={prediction?.results?.homeScore}
            required={true}
            onChange={(e) => onAddPredictions(e, matchId)}
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
            src={`https://www.fundaciontabitafeyes.org/wp-content/themes/childcare/images/default.png`}
            width={60}
            height={30}
            alt="flag"
            style={{
              border: "1px solid",
              borderRadius: "5px",
              margin: "0 auto",
            }}
          />
          <span>
            {phase === "cuartos"
              ? cuartos[index]?.awayName
              : phase === "octavos"
              ? octavos[index]?.awayName
              : phase === "semifinales"
              ? semifinales[index]?.awayName
              : phase === "final"
              ? final[index]?.awayName
              : ""}
          </span>
          <input
            type="number"
            name="awayScore"
            min={0}
            max={50}
            required={true}
            value={prediction?.results?.awayScore}
            onChange={(e) => onAddPredictions(e, matchId)}
          />
        </div>
      </div>
    </div>
  );
};

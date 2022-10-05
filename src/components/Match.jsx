import { getFlagAway, getFlagHome } from "../utils/codeFlags";

export const Match = (data) => {
  const {
    group,
    date,
    jornada,
    homeName,
    awayName,
    matchId,
    prediction,
    onAddPredictions,
  } = data;

  return (
    <div style={{ border: "1px solid", marginBottom: "2px", padding: "15px" }}>
      <h3>
        Grupo {group}. {date}. Jornada {jornada || "s/j"} / 3
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
            max={50}
            value={prediction?.results?.homeScore || ""}
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
            max={50}
            required={true}
            value={prediction?.results?.awayScore || ""}
            onChange={(e) => onAddPredictions(e, matchId)}
          />
        </div>
      </div>
    </div>
  );
};

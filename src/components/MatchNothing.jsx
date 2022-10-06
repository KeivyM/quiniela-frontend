import { useEffect, useState } from "react";
import { getFlagAway, getFlagHome } from "../utils";
// import { getFlagAway, getFlagHome } from "../utils/codeFlags";

export const MatchNothing = (data) => {
  const {
    // index,
    // group,
    // phase,
    disabled,
    date,
    homeName,
    awayName,
    matchId,
    prediction,
    onAddPredictions,
  } = data;

  const [awayScore, setAwayScore] = useState("");
  const [homeScore, setHomeScore] = useState("");

  useEffect(() => {
    if (prediction) {
      setAwayScore(prediction?.results?.awayScore);
      setHomeScore(prediction?.results?.homeScore);
    } else {
      setAwayScore("");
      setHomeScore("");
    }
  }, [prediction]);

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
            src={
              !getFlagHome(homeName)
                ? `https://www.fundaciontabitafeyes.org/wp-content/themes/childcare/images/default.png`
                : `https://cdn.sportmonks.com/images/countries/png/short/${getFlagHome(
                    homeName
                  )}.png`
            }
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
            disabled={disabled}
            type="number"
            name="homeScore"
            min={0}
            max={50}
            value={homeScore || ""}
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
            src={
              !getFlagAway(awayName)
                ? `https://www.fundaciontabitafeyes.org/wp-content/themes/childcare/images/default.png`
                : `https://cdn.sportmonks.com/images/countries/png/short/${getFlagAway(
                    awayName
                  )}.png`
            }
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
            disabled={disabled}
            type="number"
            name="awayScore"
            min={0}
            max={50}
            required={true}
            value={awayScore || ""}
            onChange={(e) => onAddPredictions(e, matchId)}
          />
        </div>
      </div>
    </div>
  );
};

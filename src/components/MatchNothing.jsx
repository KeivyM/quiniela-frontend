import { useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getFlag } from "../utils";
// import "./matchNothing.css";

export const MatchNothing = (data) => {
  const {
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
    <Box className="container-big-match" sx={{ bgcolor: "secondary.main" }}>
      <Box className="container-date-match" sx={{ color: "#000" }}>
        <AccessTimeIcon sx={{ fontSize: "1rem" }} />
        <Typography style={{ padding: 0, margin: 0, fontSize: "1rem" }}>
          {date}.
        </Typography>
      </Box>

      <Box className="container-match" sx={{ bgcolor: "primary.main" }}>
        <div
          style={{
            display: "flex",
            justifyItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h4 style={{ margin: "0" }}>{homeName}</h4>
          <div style={{ display: "flex", justifyItems: "center", gap: "8px" }}>
            <img
              src={
                !getFlag(homeName)
                  ? `https://www.fundaciontabitafeyes.org/wp-content/themes/childcare/images/default.png`
                  : `https://cdn.sportmonks.com/images/countries/png/short/${getFlag(
                      homeName
                    )}.png`
              }
              alt="flag"
              className="img-flag-phases"
            />
            <TextField
              id="outlined-number"
              type="number"
              name="homeScore"
              color="secondary"
              disabled={disabled}
              placeholder="Goles"
              style={{ padding: "0" }}
              onChange={(e) => onAddPredictions(e, matchId)}
              InputProps={{
                inputProps: {
                  min: 0,
                  value: homeScore || "",
                  style: {
                    textAlign: "center",
                    borderRadius: 5,
                  },
                },
              }}
            />
          </div>
        </div>
        <h3>VS</h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h4 style={{ margin: 0 }}>{awayName}</h4>
          <div style={{ display: "flex", justifyItems: "center", gap: "8px" }}>
            <TextField
              id="outlined-number"
              type="number"
              name="awayScore"
              color="secondary"
              disabled={disabled}
              placeholder="Goles"
              style={{ padding: "0" }}
              onChange={(e) => onAddPredictions(e, matchId)}
              InputProps={{
                inputProps: {
                  min: 0,
                  value: awayScore || "",
                  style: {
                    textAlign: "center",
                    borderRadius: 5,
                  },
                },
              }}
            />
            <img
              src={
                !getFlag(awayName)
                  ? `https://www.fundaciontabitafeyes.org/wp-content/themes/childcare/images/default.png`
                  : `https://cdn.sportmonks.com/images/countries/png/short/${getFlag(
                      awayName
                    )}.png`
              }
              alt="flag"
              className="img-flag-phases"
            />
          </div>
        </div>
      </Box>
    </Box>
  );
};

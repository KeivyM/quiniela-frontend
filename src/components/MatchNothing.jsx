import { useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getFlag } from "../utils";

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
    <Box
      sx={{
        marginBottom: "2px",
        justifyContent: "center",
        bgcolor: "#8D1B3D",
        border: "1px solid",
        borderRadius: "15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          gap: "6px",
          color: "white",
          paddingRight: "20px",
        }}
      >
        <AccessTimeIcon />
        <Typography variant="h6" style={{ padding: 0, margin: 0 }}>
          {date}.
        </Typography>
      </Box>

      <Box
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          height: "85px",
          alignItems: "center",
          borderRadius: "15px",
        }}
        sx={{
          bgcolor: "#40929d",
          boxShadow: "0px -4px 2px #0005",
          padding: "0px 75px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "30%",
            justifyItems: "center",
            justifyContent: "center",
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
              width={90}
              height={40}
              alt="flag"
              style={{
                border: ".8px solid",
                borderRadius: "5px",
                maxWidth: "70px",
              }}
            />
            <TextField
              id="outlined-number"
              type="number"
              name="homeScore"
              required={true}
              disabled={disabled}
              style={{ padding: "0" }}
              sx={{ width: "77px" }}
              onChange={(e) => onAddPredictions(e, matchId)}
              InputProps={{
                inputProps: {
                  min: 0,
                  value: homeScore || "",
                  style: {
                    padding: "8px",
                    textAlign: "center",
                    background: "#fff",
                    borderRadius: 5,
                    fontWeight: 800,
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
            width: "30%",
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
              required={true}
              disabled={disabled}
              style={{ padding: "0" }}
              sx={{ width: "77px" }}
              onChange={(e) => onAddPredictions(e, matchId)}
              InputProps={{
                inputProps: {
                  min: 0,
                  value: awayScore || "",
                  style: {
                    padding: "8px",
                    textAlign: "center",
                    background: "#fff",
                    borderRadius: 5,
                    fontWeight: 800,
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
              width={90}
              height={40}
              alt="flag"
              style={{
                border: ".8px solid",
                borderRadius: "5px",
                width: "max-content",
                maxWidth: "70px",
              }}
            />
          </div>
        </div>
      </Box>
    </Box>
  );
};

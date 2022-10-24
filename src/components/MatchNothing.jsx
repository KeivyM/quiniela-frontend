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
    <Box
      className="container-big-match"
      sx={{
        bgcolor: "secondary.main",
        //   marginBottom: "2px",
        //   justifyContent: "center",
        //   border: "1px solid",
        //   borderRadius: "15px",
      }}
    >
      <Box
        className="container-date-match"
        sx={{
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "end",
          // gap: "6px",
          color: "#000",
          // paddingRight: "20px",
          // margin: "6px 0px",
        }}
      >
        <AccessTimeIcon sx={{ fontSize: "1rem" }} />
        <Typography style={{ padding: 0, margin: 0, fontSize: "1rem" }}>
          {date}.
        </Typography>
      </Box>

      <Box
        className="container-match"
        // style={{
        //   display: "flex",
        //   justifyContent: "space-evenly",
        //   width: "100%",
        //   height: "85px",
        //   alignItems: "center",
        //   borderRadius: "15px",
        //   gap: "10px",
        // }}
        sx={{
          bgcolor: "primary.main",
          // boxShadow: "0px -4px 2px #0005",
          // padding: "0px 75px",
          // boxSizing: "border-box",
        }}
      >
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
              // width={60}
              // height={40}
              alt="flag"
              // style={{
              //   border: ".8px solid",
              //   borderRadius: "5px",
              // }}
              className="img-flag-phases"
            />
            <TextField
              id="outlined-number"
              type="number"
              name="homeScore"
              disabled={disabled}
              placeholder="Goles"
              style={{ padding: "0" }}
              // sx={{ width: "77px" }}
              onChange={(e) => onAddPredictions(e, matchId)}
              InputProps={{
                inputProps: {
                  min: 0,
                  value: homeScore || "",
                  style: {
                    // padding: "8px",
                    textAlign: "center",
                    // background: "#fff",
                    borderRadius: 5,
                    // fontWeight: 800,
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
              disabled={disabled}
              placeholder="Goles"
              style={{ padding: "0" }}
              // sx={{ width: "77px" }}
              onChange={(e) => onAddPredictions(e, matchId)}
              InputProps={{
                inputProps: {
                  min: 0,
                  value: awayScore || "",
                  style: {
                    // padding: "8px",
                    textAlign: "center",
                    // background: "#fff",
                    borderRadius: 5,
                    // fontWeight: 800,
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
              // width={60}
              // height={40}
              alt="flag"
              // style={{
              //   border: ".8px solid",
              //   borderRadius: "5px",
              // }}
              className="img-flag-phases"
            />
          </div>
        </div>
      </Box>
    </Box>
  );
};

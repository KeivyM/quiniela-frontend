import { TextField, Typography, Box } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getFlag } from "../utils";
// import "./match.css";

export const Match = (data) => {
  const {
    disabled,
    date,
    homeName,
    awayName,
    matchId,
    prediction,
    onAddPredictions,
  } = data;

  return (
    <Box className="container-big-match" sx={{ bgcolor: "secondary.main" }}>
      <Box className="container-date-match" sx={{ color: "#000" }}>
        <AccessTimeIcon sx={{ fontSize: "1rem" }} />
        <Typography style={{ padding: 0, margin: 0, fontSize: "1rem" }}>
          {date}.
        </Typography>
      </Box>

      <Box className="container-match" sx={{ bgcolor: "primary.main" }}>
        <Box className="container-team">
          <h4 style={{ margin: "0px" }}>{homeName}</h4>
          <div className="homeTeam">
            <img
              src={`https://cdn.sportmonks.com/images/countries/png/short/${getFlag(
                homeName
              )}.png`}
              alt="flag"
              className="img-flag-phases"
            />
            <TextField
              id="outlined-number"
              // className="inputs-goals"
              color="secondary"
              className="outlined-number-custom"
              type="number"
              name="homeScore"
              placeholder="Goles"
              disabled={disabled}
              style={{ padding: "0" }}
              onChange={(e) => onAddPredictions(e, matchId)}
              InputProps={{
                inputProps: {
                  min: 0,
                  value: prediction?.results?.homeScore || "",
                  style: {
                    borderRadius: 5,
                    textAlign: "center",
                    background: "#fff",
                  },
                },
              }}
            />
          </div>
        </Box>
        <h3>VS</h3>
        <Box className="container-team">
          <h4 style={{ margin: "0px" }}>{awayName}</h4>
          <Box className="awayTeam">
            <TextField
              id="outlined-number"
              type="number"
              name="awayScore"
              color="secondary"
              placeholder="Goles"
              disabled={disabled}
              onChange={(e) => onAddPredictions(e, matchId)}
              InputProps={{
                inputProps: {
                  min: 0,
                  value: prediction?.results?.awayScore || "",
                  style: {
                    textAlign: "center",
                    background: "#fff",
                    borderRadius: 5,
                    fontWeight: 800,
                  },
                },
              }}
            />
            <img
              src={`https://cdn.sportmonks.com/images/countries/png/short/${getFlag(
                awayName
              )}.png`}
              alt="flag"
              style={{
                border: ".8px solid",
                borderRadius: "5px",
              }}
              className="img-flag-phases"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

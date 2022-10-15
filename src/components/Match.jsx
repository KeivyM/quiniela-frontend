import { TextField, Typography, Box } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getFlag } from "../utils";
import "./match.css";

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
          justifyContent: "space-evenly",
          width: "100%",
          height: "85px",
          alignItems: "center",
          borderRadius: "15px",
          gap: "10px",
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
            justifyItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h4 style={{ margin: "0px" }}>{homeName}</h4>
          <div style={{ display: "flex", justifyItems: "center", gap: "8px" }}>
            <img
              src={`https://cdn.sportmonks.com/images/countries/png/short/${getFlag(
                homeName
              )}.png`}
              height={40}
              alt="flag"
              style={{
                border: ".8px solid",
                borderRadius: "5px",
                width: "max-content",
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
                  value: prediction?.results?.homeScore || "",
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
            textAlign: "center",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h4 style={{ margin: "0px" }}>{awayName}</h4>
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
                  value: prediction?.results?.awayScore || "",
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
              src={`https://cdn.sportmonks.com/images/countries/png/short/${getFlag(
                awayName
              )}.png`}
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

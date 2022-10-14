import { TextField, Typography, Box } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getFlag } from "../utils";
import "./match.css";

export const Match = (data) => {
  const {
    dateMomentDay,
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
            alignItems: "end",
            gap: "10px",
            width: "30%",
            justifyItems: "center",
            justifyContent: "center",
          }}
        >
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
          <div style={{ display: "grid", justifyItems: "center" }}>
            <h4 style={{ margin: "0px" }}>{homeName}</h4>
            <TextField
              id="outlined-number"
              type="number"
              name="homeScore"
              required={true}
              disabled={disabled}
              style={{ padding: "0" }}
              sx={{ width: "100px" }}
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
            gap: "10px",
            width: "30%",
            alignItems: "end",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "grid", justifyItems: "center" }}>
            <h4 style={{ margin: "0px" }}>{awayName}</h4>
            <TextField
              id="outlined-number"
              type="number"
              name="awayScore"
              required={true}
              disabled={disabled}
              style={{ padding: "0" }}
              sx={{ width: "100px" }}
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
          </div>
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
      </Box>
    </Box>
  );
};

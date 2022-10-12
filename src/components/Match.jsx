import { TextField } from "@mui/material";
import { Box } from "@mui/system";
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
    <Box
      sx={{
        marginBottom: "2px",
        justifyContent: "center",
        bgcolor: "custom.dark",
      }}
      style={{
        border: "1px solid",
        padding: "15px",
      }}
    >
      <h3>
        Grupo {group}. {date}. Jornada {jornada} / 3
      </h3>

      <Box
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          height: "130px",
          alignItems: "center",
        }}
        sx={{ bgcolor: "custom.light" }}
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
            src={`https://cdn.sportmonks.com/images/countries/png/short/${getFlagAway(
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
                  },
                },
              }}
            />
          </div>
          <img
            src={`https://cdn.sportmonks.com/images/countries/png/short/${getFlagAway(
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

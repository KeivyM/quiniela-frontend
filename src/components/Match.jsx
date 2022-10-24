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
    <Box
      className="container-big-match"
      sx={{
        // marginBottom: "2px",
        // justifyContent: "center",
        // border: "1px solid",
        // borderRadius: "15px",
        bgcolor: "secondary.main",
      }}
    >
      <Box
        className="container-date-match"
        sx={{
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "end",
          // gap: "6px",
          // paddingRight: "20px",
          // margin: "6px 0px",
          color: "#000",
        }}
      >
        <AccessTimeIcon sx={{ fontSize: "1rem" }} />
        <Typography style={{ padding: 0, margin: 0, fontSize: "1rem" }}>
          {date}.
        </Typography>
      </Box>

      <Box
        className="container-match"
        style={
          {
            // display: "flex",
            // justifyContent: "space-evenly",
            // width: "100%",
            // height: "85px",
            // alignItems: "center",
            // borderRadius: "15px",
            // gap: "10px",
          }
        }
        sx={{
          bgcolor: "primary.main",
          // boxShadow: "0px -4px 2px #0005",
          // padding: "0px 75px",
        }}
      >
        <Box
          className="container-team"
          // style={{
          //   display: "flex",
          //   justifyItems: "center",
          //   flexDirection: "column",
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
        >
          <h4 style={{ margin: "0px" }}>{homeName}</h4>
          <div
            className="homeTeam"
            // style={{ display: "flex", justifyItems: "center", gap: "8px" }}
          >
            <img
              src={`https://cdn.sportmonks.com/images/countries/png/short/${getFlag(
                homeName
              )}.png`}
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
              className="inputs-goals"
              type="number"
              name="homeScore"
              placeholder="Goles"
              disabled={disabled}
              style={{ padding: "0" }}
              // sx={{ width: "77px" }}
              onChange={(e) => onAddPredictions(e, matchId)}
              InputProps={{
                inputProps: {
                  min: 0,
                  value: prediction?.results?.homeScore || "",
                  style: {
                    // padding: "5px",
                    borderRadius: 5,
                    textAlign: "center",
                    background: "#fff",
                    // fontWeight: 800,
                  },
                },
              }}
            />
          </div>
        </Box>
        <h3>VS</h3>
        <Box
          className="container-team"
          style={
            {
              // display: "flex",
              // textAlign: "center",
              // flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
            }
          }
        >
          <h4 style={{ margin: "0px" }}>{awayName}</h4>
          <Box
            className="awayTeam"
            // style={{ display: "flex", justifyItems: "center", gap: "8px" }}
          >
            <TextField
              id="outlined-number"
              type="number"
              name="awayScore"
              placeholder="Goles"
              disabled={disabled}
              // style={{ padding: "0" }}
              // sx={{ width: "77px" }}
              onChange={(e) => onAddPredictions(e, matchId)}
              InputProps={{
                inputProps: {
                  min: 0,
                  value: prediction?.results?.awayScore || "",
                  style: {
                    // padding: "8px",
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
              // height={40}
              // width={60}
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

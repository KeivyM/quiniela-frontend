import { Box, Typography } from "@mui/material";
import moment from "moment";
import "moment-timezone";
import { useEffect, useState } from "react";
import { getFlag } from "../utils";
import "./calendarMatch.css";

export const CalendarMatch = (data) => {
  const { matchTime, homeName, awayName, awayScore, homeScore } = data;
  const dateMoment = moment(matchTime * 1000).format("L");
  const [scores, setScores] = useState(null);

  useEffect(() => {
    const dateUtc = moment.utc();
    const timeNow = moment
      .tz(dateUtc, "YYYY-MM-DD h:mm a", "America/Caracas")
      .unix();

    if (timeNow >= matchTime) {
      setScores({ home: homeScore, away: awayScore });
    }
  }, [matchTime, awayScore, homeScore]);

  return (
    <>
      <Box
        sx={{ bgcolor: "primary.light" }}
        className="container-calendar-match"
      >
        <Box className="content-home-country">
          <img
            src={
              !getFlag(homeName)
                ? `https://www.fundaciontabitafeyes.org/wp-content/themes/childcare/images/default.png`
                : `https://cdn.sportmonks.com/images/countries/png/short/${getFlag(
                    homeName
                  )}.png`
            }
            className="img-flag"
            alt="flag"
          />
          <Typography className="nameCountry">{homeName}</Typography>
        </Box>
        <Box>
          <Typography className="date-calendar-match">{dateMoment}</Typography>
          <Typography className="container-points">
            {scores != null && (
              <strong>{`${scores.home}0 - 8${scores.away}`}</strong>
            )}
          </Typography>
        </Box>
        <Box className="content-away-country">
          <Typography className="nameCountry">{awayName}</Typography>
          <img
            src={
              !getFlag(awayName)
                ? `https://www.fundaciontabitafeyes.org/wp-content/themes/childcare/images/default.png`
                : `https://cdn.sportmonks.com/images/countries/png/short/${getFlag(
                    awayName
                  )}.png`
            }
            alt="flag"
            className="img-flag"
          />
        </Box>
      </Box>
      <hr style={{ margin: "0" }} />
    </>
  );
};

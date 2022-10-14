import moment from "moment";
import "moment-timezone";
import { useEffect, useState } from "react";
import { getFlag } from "../utils";

const style = {
  width: "100%",
  background: "#a869",
  display: "flex",
  justifyContent: "space-between",
  color: "black",
  fontSize: "18px",
  alignItems: "center",
};
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
      <div style={style}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "30%",
            marginLeft: "15px",
          }}
        >
          <img
            src={`https://cdn.sportmonks.com/images/countries/png/short/${getFlag(
              homeName
            )}.png`}
            width={40}
            height={40}
            alt="flag"
            style={{
              border: ".8px solid",
              borderRadius: "5px",
              // margin: "0 auto",
              width: "max-content",
            }}
          />
          <h4>{homeName}</h4>
        </div>
        <div>
          <p style={{ margin: "0" }}>{dateMoment}</p>
          <p style={{ margin: "0", background: "white" }}>
            {scores != null && (
              <strong>{`${scores.home} - ${scores.away}`}</strong>
            )}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "30%",
            justifyContent: "right",
            marginRight: "15px",
          }}
        >
          <h4>{awayName}</h4>
          <img
            src={`https://cdn.sportmonks.com/images/countries/png/short/${getFlag(
              awayName
            )}.png`}
            width={40}
            height={40}
            alt="flag"
            style={{
              border: ".8px solid",
              borderRadius: "5px",
              // margin: "0 auto",
              width: "max-content",
              maxWidth: "70px",
            }}
          />
        </div>
      </div>
      <hr style={{ margin: "0" }} />
    </>
  );
};

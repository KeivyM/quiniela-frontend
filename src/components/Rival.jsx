import moment from "moment";
import { getFlagAway } from "../utils/codeFlags";

const style = {
  width: "100%",
  background: "#a869",
  display: "flex",
  justifyContent: "space-between",
  color: "black",
  fontSize: "18px",
  alignItems: "center",
};
export const Rival = (data) => {
  const { matchTime, homeName, awayName } = data;
  const dateMoment = moment(matchTime * 1000).format("L");

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
            src={`https://cdn.sportmonks.com/images/countries/png/short/${getFlagAway(
              homeName
            )}.png`}
            width={40}
            height={40}
            alt="flag"
            style={{
              border: "1px solid",
              borderRadius: "5px",
              // margin: "0 auto",
              width: "max-content",
            }}
          />
          <h4>{homeName}</h4>
        </div>
        <p>{dateMoment}</p>
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
            src={`https://cdn.sportmonks.com/images/countries/png/short/${getFlagAway(
              awayName
            )}.png`}
            width={40}
            height={40}
            alt="flag"
            style={{
              border: "1px solid",
              borderRadius: "5px",
              // margin: "0 auto",
              width: "max-content",
            }}
          />
        </div>
      </div>
      <hr style={{ margin: "0" }} />
    </>
  );
};

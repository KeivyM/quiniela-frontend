import moment from "moment";
import { getFlagAway } from "../utils/codeFlags";

const style = {
  width: "100%",
  background: "#a869",
  display: "flex",
  justifyContent: "space-between",
  color: "black",
  fontSize: "18px",
};
export const Rival = (data) => {
  const { matchTime, homeName, awayName } = data;
  const dateMoment = moment(matchTime * 1000).format("L");

  return (
    <div style={style}>
      <img
        src={`https://cdn.sportmonks.com/images/countries/png/short/${getFlagAway(
          homeName
        )}.png`}
        width={60}
        height={30}
        alt="flag"
        style={{
          border: "1px solid",
          borderRadius: "5px",
          margin: "0 auto",
        }}
      />
      <h3>{homeName}</h3>
      <p>{dateMoment}</p>
      <h3>{awayName}</h3>
      <img
        src={`https://cdn.sportmonks.com/images/countries/png/short/${getFlagAway(
          awayName
        )}.png`}
        width={60}
        height={30}
        alt="flag"
        style={{
          border: "1px solid",
          borderRadius: "5px",
          margin: "0 auto",
        }}
      />
    </div>
  );
};

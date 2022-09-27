import axios from "axios";
import { useEffect, useState } from "react";
import { Rival } from "./Rival";

// const array = [1, 2, 3, 4, 5, 6];
const style = {
  background: "#cda9",
  width: "700px",
  color: "black",
  textAlign: "center",
  margin: "0 auto",
};

export const Calendar = () => {
  const [matches, setMatches] = useState([]);

  const getMatches = () => {
    axios
      .get(
        "http://api.isportsapi.com/sport/football/schedule?api_key=7ysUHBwXouU3Bb48&leagueId=1572"
      )
      .then((res) => setMatches(res.data.data));
  };

  useEffect(() => {
    getMatches();
  }, []);

  return (
    <div style={style}>
      <h2>Jornada 1</h2>
      <div>
        <hr />
        {matches.map((match) => {
          return <Rival {...match} />;
        })}
      </div>
    </div>
  );
};

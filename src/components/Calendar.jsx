import { Rival } from "./Rival";
const style = {
  background: "#cda9",
  width: "700px",
  color: "black",
  textAlign: "center",
  margin: "0 auto",
};

export const Calendar = ({ matches, title }) => {
  return (
    <div style={style}>
      <h2>{title}</h2>
      <div>
        <hr />
        {matches.map((match) => {
          const jornada2 = 1669370400;
          const jornada3 = 1669734000;

          const jornada =
            match.matchTime < jornada2
              ? "1"
              : match.matchTime < jornada3
              ? "2"
              : "3";
          return (
            <>
              {/* <h3>Jornada {jornada}</h3> */}
              <Rival jornada={jornada} {...match} />
            </>
          );
        })}
      </div>
    </div>
  );
};

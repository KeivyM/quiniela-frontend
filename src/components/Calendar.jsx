import { CalendarMatch } from "./CalendarMatch";
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
        {matches?.map((match, index) => {
          return <CalendarMatch key={index} {...match} />;
        })}
      </div>
    </div>
  );
};

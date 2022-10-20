import { Box } from "@mui/material";
import { CalendarMatch } from "./CalendarMatch";
const style = {
  // background: "#cda9",
  width: "700px",
  color: "black",
  textAlign: "center",
  margin: "0 auto",
  marginBottom: "60px",
  padding: "1px 0px 0px",
};

export const Calendar = ({ matches, title }) => {
  return (
    <Box style={style} sx={{ bgcolor: "secondary.light" }}>
      <h2 style={{ margin: "10px 0px", color: "white" }}>{title}</h2>
      <div>
        {matches?.map((match, index) => {
          return <CalendarMatch key={index} {...match} />;
        })}
      </div>
    </Box>
  );
};

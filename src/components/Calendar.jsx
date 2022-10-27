import { Box, Typography } from "@mui/material";
import { CalendarMatch } from "./CalendarMatch";
import "./calendar.css";

export const Calendar = ({ matches, title }) => {
  return (
    <Box
      className="container-calendar"
      sx={{
        // width: "100%",
        // textAlign: "center",
        // marginBottom: "60px",
        // paddingTop: "1px",
        bgcolor: "secondary.light",
      }}
    >
      <Typography className="title-calendar" sx={{ color: "#ecf2ec" }}>
        {title}
      </Typography>
      <div>
        {matches?.map((match, index) => {
          return <CalendarMatch key={index} {...match} />;
        })}
      </div>
    </Box>
  );
};

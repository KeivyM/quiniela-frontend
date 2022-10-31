import { Box, Typography } from "@mui/material";
import { CalendarMatch } from "./CalendarMatch";
import "./calendar.css";

export const Calendar = ({ matches, title }) => {
  return (
    <Box className="container-calendar" sx={{ bgcolor: "secondary.light" }}>
      <Typography className="title-calendar" sx={{ color: "#ecf2ec" }}>
        {title}
      </Typography>
      <Box>
        {matches?.map((match, index) => {
          return <CalendarMatch key={index} {...match} />;
        })}
      </Box>
    </Box>
  );
};

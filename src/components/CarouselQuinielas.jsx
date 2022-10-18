import { useEffect, useState } from "react";
import { Quiniela, QuinielaPlayer } from "./";
import {
  Box,
  Button,
  MobileStepper,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  SportsSoccer as SportsSoccerIcon,
} from "@mui/icons-material";
import axios from "axios";

export function CarouselQuinielas() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [match, setMatches] = useState([]);

  const predefinedData = {
    octavos: [
      {
        matchId: "2270583212125",
        matchTime: 1670079600,
        status: 0,
        homeName: "Por definirse",
        awayName: "Por definirse",
      },
      {
        matchId: "11235267058129",
        matchTime: 1670094000,
        status: 0,
        homeName: "Por definirse",
        awayName: "Por definirse",
      },
      {
        matchId: "771221237058126",
        matchTime: 1670166000,
        status: 0,
        homeName: "Por definirse",
        awayName: "Por definirse",
      },
      {
        matchId: "341232193358121",
        matchTime: 1670180400,
        status: 0,
        homeName: "Por definirse",
        awayName: "Por definirse",
      },
      {
        matchId: "22705812339875",
        matchTime: 1670252400,
        status: 0,
        homeName: "Por definirse",
        awayName: "Por definirse",
      },
      {
        matchId: "267058108765429",
        matchTime: 1670266800,
        status: 0,
        homeName: "Por definirse",
        awayName: "Por definirse",
      },
      {
        matchId: "23705678958126",
        matchTime: 1670338800,
        status: 0,
        homeName: "Por definirse",
        awayName: "Por definirse",
      },
      {
        matchId: "39541335812144",
        matchTime: 1670353200,
        status: 0,
        homeName: "Por definirse",
        awayName: "Por definirse",
      },
    ],
    cuartos: [
      {
        matchId: "2273312321058125",
        matchTime: 1670598000,
        status: 0,
        homeName: "Por definirse",
        awayName: "Por definirse",
      },
      {
        matchId: "267058789863129",
        matchTime: 1670612400,
        status: 0,
        homeName: "Por definirse",
        awayName: "Por definirse",
      },
      {
        matchId: "23703458125546",
        matchTime: 1670684400,
        status: 0,
        homeName: "Por definirse",
        awayName: "Por definirse",
      },
      {
        matchId: "3933586775433121",
        matchTime: 1670698800,
        status: 0,
        homeName: "Por definirse",
        awayName: "Por definirse",
      },
    ],
    semifinales: [
      {
        matchId: "22707600358125",
        matchTime: 1670958000,
        status: 0,
        homeName: "Por definirse",
        awayName: "Por definirse",
      },
      {
        matchId: "267058122987429",
        matchTime: 1671044400,
        status: 0,
        homeName: "Por definirse",
        awayName: "Por definirse",
      },
    ],
    final: [
      {
        matchId: "227058155573225",
        matchTime: 1671289200,
        status: 0,
        homeName: "Por definirse",
        awayName: "Por definirse",
      },
      {
        matchId: "26705812955986332",
        matchTime: 1671375600,
        status: 0,
        homeName: "Por definirse",
        awayName: "Por definirse",
      },
    ],
  };

  const steps = [
    {
      label: <span>Fase de Grupos</span>,
      description: (
        <Quiniela phase="Grupos" arrayDePartidos={match?.slice(0, 48)} />
      ),
    },
    {
      label: <span>Octavos de final</span>,
      description: (
        <Quiniela
          phase="Octavos"
          arrayDePartidos={
            match?.length > 48 ? match?.slice(48, 56) : predefinedData.octavos
          }
        />
      ),
    },
    {
      label: <span>Cuartos de final</span>,
      description: (
        <Quiniela
          phase="Cuartos"
          arrayDePartidos={
            match?.length > 56 ? match?.slice(56, 60) : predefinedData.cuartos
          }
        />
      ),
    },
    {
      label: <span>Semifinales</span>,
      description: (
        <Quiniela
          phase="Semifinales"
          arrayDePartidos={
            match?.length > 60
              ? match?.slice(60, 62)
              : predefinedData.semifinales
          }
        />
      ),
    },
    {
      label: (
        <span style={{ display: "flex", alignItems: "center" }}>
          G<SportsSoccerIcon style={{ fontSize: "21px", marginTop: "3px" }} />
          leador del Mundial
        </span>
      ),
      description: <QuinielaPlayer />,
    },
    {
      label: <span>Final</span>,
      description: (
        <Quiniela
          phase="Final"
          arrayDePartidos={
            match?.length > 62 ? match?.slice(62, 64) : predefinedData.final
          }
        />
      ),
    },
  ];

  const maxSteps = steps.length;

  const getMatches = async () => {
    // const options = {
    //   mode: "cors",
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     // "Content-Type": "application/json",
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // };
    // await axios //cambiar apiKey
    //   .get(
    //     "http://api.isportsapi.com/sport/football/schedule?api_key=nqt7nbnv0VyRFjJf&leagueId=1572"
    //   )
    //   .then((res) => setMatches(res.data.data));
    //
    //
    ///para hacer pruebas con champions league //eliminar
    await axios
      .get(
        "http://api.isportsapi.com/sport/football/schedule?api_key=nqt7nbnv0VyRFjJf&leagueId=13014"
        // options
      )
      .then((res) => {
        console.log(res);
        return setMatches(res.data.data);
      });
  };

  useEffect(() => {
    getMatches();
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        minWidth: "480px",
        minHeight: "100%",
        height: "100%",
        flexGrow: 1,
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          bgcolor: "#083358",
        }}
      >
        <Typography
          style={{
            fontSize: "29px",
            margin: "0 auto",
            color: "#cad",
          }}
        >
          {steps[activeStep].label}
        </Typography>
      </Paper>

      {steps[activeStep].description}
      <MobileStepper
        sx={{
          // bgcolor: "custom.light",
          bgcolor: "white",
          border: "1px solid",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "5px",
        }}
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Adelante
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Atrás
          </Button>
        }
      />
    </Box>
  );
}

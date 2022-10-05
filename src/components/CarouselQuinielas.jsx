import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Quiniela } from "./Quiniela";
import { useEffect, useState } from "react";
import axios from "axios";

export function CarouselQuinielas() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [match, setMatches] = useState([]);
  // data.slice(0, 32); //16avos de final
  // data.slice(0, 16); //8vos de final
  // data.slice(0, 8); //4tos de final
  // data.slice(0, 4); //Semis
  // data.slice(5, 8); //Tercer puesto
  // data.slice(0, 2); //Final

  const dataDePrueba = {
    octavos: [
      {
        matchId: "2270583212125",
        matchTime: 1668959940,
        status: 0,
        homeName: "1A",
        awayName: "2B",
      },
      {
        matchId: "11235267058129",
        matchTime: 1669035600,
        status: 0,
        homeName: "1C",
        awayName: "2D",
      },
      {
        matchId: "771221237058126",
        matchTime: 1669046340,
        status: 0,
        homeName: "1D",
        awayName: "2C",
      },
      {
        matchId: "341232193358121",
        matchTime: 1669057200,
        status: 0,
        homeName: "1B",
        awayName: "2A",
      },
      {
        matchId: "22705812339875",
        matchTime: 1668959940,
        status: 0,
        homeName: "1E",
        awayName: "2F",
      },
      {
        matchId: "267058108765429",
        matchTime: 1669035600,
        status: 0,
        homeName: "1G",
        awayName: "2H",
      },
      {
        matchId: "23705678958126",
        matchTime: 1669046340,
        status: 0,
        homeName: "1F",
        awayName: "2E",
      },
      {
        matchId: "39541335812144",
        matchTime: 1669057200,
        status: 0,
        homeName: "1H",
        awayName: "2G",
      },
    ],
    cuartos: [
      {
        matchId: "2273312321058125",
        matchTime: 1668959940,
        status: 0,
        homeName: "Ganador octavos 5",
        awayName: "Ganador octavos 6",
      },
      {
        matchId: "267058789863129",
        matchTime: 1669035600,
        status: 0,
        homeName: "Ganador octavos 1",
        awayName: "Ganador octavos 2",
      },
      {
        matchId: "23703458125546",
        matchTime: 1669046340,
        status: 0,
        homeName: "Ganador octavos 7",
        awayName: "Ganador octavos 8",
      },
      {
        matchId: "3933586775433121",
        matchTime: 1669057200,
        status: 0,
        homeName: "Ganador octavos 3",
        awayName: "Ganador octavos4",
      },
    ],
    semifinales: [
      {
        matchId: "22707600358125",
        matchTime: 1668959940,
        status: 0,
        homeName: "Ganador cuartos de final 1",
        awayName: "Ganador cuartos de final 2",
      },
      {
        matchId: "267058122987429",
        matchTime: 1669035600,
        status: 0,
        homeName: "Ganador cuartos de final 3",
        awayName: "Ganador cuartos de final 4",
      },
    ],
    final: [
      {
        matchId: "227058155573225",
        matchTime: 1668959940,
        status: 0,
        homeName: "Perdedor semifinal 1",
        awayName: "perdedor semifinal 2",
      },
      {
        matchId: "26705812955986332",
        matchTime: 1669035600,
        status: 0,
        homeName: "Ganador semifinal 1",
        awayName: "Ganador semifinal 2",
      },
    ],
  };
  // console.log(match.length);

  // console.log(match?.slice(38, 46));
  const steps = [
    {
      label: "Fase de Grupos",
      description: (
        <Quiniela phase="Grupos" arrayDePartidos={match?.slice(0, 48)} />
      ),
    },
    {
      label: "Octavos de final",
      description: (
        <Quiniela
          phase="Octavos"
          arrayDePartidos={
            match.length > 48 ? match?.slice(48, 56) : dataDePrueba.octavos
          } // cambiar a match?.slice(48,56)) y match.length > 48
        />
      ),
    },
    {
      label: "Cuartos de final",
      description: (
        <Quiniela
          phase="Cuartos"
          arrayDePartidos={
            match.length > 48 ? match?.slice(56, 60) : dataDePrueba.cuartos
          }
        />
      ),
    },
    {
      label: "Semifinales",
      description: (
        // Math.floor(Date.now() / 1000) >= 1670958000 ? (
        <Quiniela
          phase="Semifinales"
          arrayDePartidos={
            match.length > 48 ? match?.slice(60, 62) : dataDePrueba.semifinales
          }
        />
      ),
      // ) : (
      //   <h3>Ésta Quiniela no está disponible</h3>
      // ),
    },
    {
      label: "Final",
      description: (
        <Quiniela
          phase="Final"
          arrayDePartidos={
            match.length > 48 ? match?.slice(62, 64) : dataDePrueba.final
          }
        />
      ),
    },
  ];

  // const steps = [
  //   {
  //     label: "Fase de Grupos",
  //     description: <Quiniela arrayDePartidos={match?.slice(0, 48)} />,
  //   },
  //   {
  //     label: "Octavos de final",
  //     description: <Quiniela arrayDePartidos={match?.slice(39, -1)} />,
  //   },
  //   {
  //     label: "Cuartos de final",
  //     description: <Quiniela arrayDePartidos={match?.slice(43, -1)} />,
  //   },
  //   {
  //     label: "Semifinales",
  //     description: <Quiniela arrayDePartidos={match?.slice(45, -1)} />,
  //   },
  //   {
  //     label: "Final",
  //     description: <Quiniela arrayDePartidos={match?.slice(20, -26)} />,
  //   },
  // ];

  const maxSteps = steps.length;

  const getMatches = async () => {
    await axios
      .get(
        "http://api.isportsapi.com/sport/football/schedule?api_key=EGlD1j0CeqDo3hcr&leagueId=1572"
      )
      .then((res) => setMatches(res.data.data));
    //
    //
    /////para hacer pruebas con champions league
    // axios
    //   .get(
    //     "http://api.isportsapi.com/sport/football/schedule?api_key=EGlD1j0CeqDo3hcr&leagueId=13014"
    //   )
    //   .then((res) => {
    //     const resultado = res.data.data.filter((obj) => obj.group != "");
    //     return setMatches(resultado);
    //   });
    // console.log(match);
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
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography>{steps[activeStep].label}</Typography>
      </Paper>
      {/* <Box sx={{ height: 255, maxWidth: 400, width: "100%", p: 2 }}>
        {steps[activeStep].description}
      </Box> */}
      {steps[activeStep].description}
    </Box>
  );
}

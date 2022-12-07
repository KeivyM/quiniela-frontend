import { useCallback, useContext, useEffect, useState } from "react";
import { Quiniela, QuinielaPlayer } from "./";
import { AuthContext } from "../context";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./carouselQuinielas.css";

export function CarouselQuinielas() {
  const { setLoading } = useContext(AuthContext);
  const [activeStep, setActiveStep] = useState(0);
  const [matches, setMatches] = useState([]);
  const theme = useTheme();

  const notify = () =>
    toast.error("No se pudo obtener los partidos, Intenta más tarde!", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      icon: false,
      theme: "light",
    });

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
    // {
    //   label: <span>Fase de Grupos</span>,
    //   description: (
    //     <Quiniela phase="Grupos" arrayDePartidos={matches?.slice(0, 48)} />
    //   ),
    // },
    // {
    //   label: <span>Octavos de final</span>,
    //   description: (
    //     <Quiniela
    //       phase="Octavos"
    //       arrayDePartidos={
    //         matches?.length > 48
    //           ? matches?.slice(48, 56)
    //           : predefinedData.octavos
    //       }
    //     />
    //   ),
    // },
    {
      label: <span>Cuartos de final</span>,
      description: (
        <Quiniela
          phase="Cuartos"
          arrayDePartidos={
            matches?.length > 56
              ? matches?.slice(56, 60)
              : predefinedData.cuartos
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
            matches?.length > 60
              ? matches?.slice(60, 62)
              : predefinedData.semifinales
          }
        />
      ),
    },
    {
      label: <span>Final</span>,
      description: (
        <Quiniela
          phase="Final"
          arrayDePartidos={
            matches?.length > 62 ? matches?.slice(62, 64) : predefinedData.final
          }
        />
      ),
    },
    {
      label: (
        <span style={{ display: "flex", alignItems: "center" }}>
          G<SportsSoccerIcon className="icon-ball-title" />
          leador del Mundial
        </span>
      ),
      description: <QuinielaPlayer />,
    },
  ];

  const maxSteps = steps.length;

  const getMatches = useCallback(async () => {
    try {
      await axios
        .get("https://quiniela-backend.vercel.app/prediction/getMatchesFromApi")
        .then((res) => setMatches(res.data.data));
    } catch (error) {
      notify();
    }
    setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    setLoading(true);
    getMatches();
  }, [getMatches, setLoading]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box className="carousel-quinielas">
      <Paper
        className="paper-custom"
        square
        elevation={0}
        sx={{
          bgcolor: "secondary.light",
        }}
      >
        <Typography className="phase-title">
          {steps[activeStep].label}
        </Typography>
      </Paper>

      {steps[activeStep].description}
      <MobileStepper
        sx={{ bgcolor: "secondary.light" }}
        className="mobile-stepper-custom"
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

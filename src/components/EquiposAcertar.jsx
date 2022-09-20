import axios from "axios";
import { useEffect, useState } from "react";

export const EquiposAcertar = () => {
  const [data, setData] = useState([]);

  // const array = [
  //   {
  //     grupo: "A",
  //     Jornada: 1,
  //     hora: "12:00 pm.",
  //     equipo1: "Catar",
  //     logo1:
  //       "https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Qatar.svg",
  //     equipo2: "España",
  //     logo2:
  //       "https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg",
  //   },
  //   {
  //     grupo: "B",
  //     Jornada: 1,
  //     hora: "09:00 am.",
  //     equipo1: "Inglaterra",
  //     logo1:
  //       "https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Qatar.svg",
  //     equipo2: "Irán",
  //     logo2:
  //       "https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg",
  //   },
  //   {
  //     grupo: "A",
  //     Jornada: 1,
  //     hora: "12:00 pm.",
  //     equipo1: "Senegal",
  //     logo1:
  //       "https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Qatar.svg",
  //     equipo2: "Paises Bajos",
  //     logo2:
  //       "https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg",
  //   },
  // ];

  const peticion = () => {
    axios
      .get(
        "http://api.isportsapi.com/sport/football/schedule?api_key=0tfdbXpbtuc9eIfC&leagueId=1572"
      )
      .then((res) => setData(res.data.data));
  };

  useEffect(() => {
    // console.log(data);
    peticion();
  }, []);

  return (
    <div
      style={{
        background: "grey",
        width: "800px",
        padding: "40px",
        display: "flex",
        gap: "50px",
        overflowX: "auto",
        margin: "0 auto",
      }}
    >
      {data.map((obj, index) => {
        const date = new Date(obj.matchTime * 1000).toString();
        return (
          <div key={index}>
            <h3>
              Grupo {obj.group}. {date}. Jornada eror / 3
            </h3>
            <button>Guardar</button>
            <div
              style={{
                background: "#ccc",
                display: "flex",
                justifyContent: "space-around",
                width: "400px",
                height: "100px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Qatar.svg"
                  width={60}
                  height={30}
                  alt="flag"
                  style={{
                    border: "1px solid",
                    borderRadius: "5px",
                    margin: "0 auto",
                  }}
                />
                <span>{obj.homeName}</span>
                <input type="number" min={0} defaultValue={0} />
              </div>
              vs
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg"
                  width={60}
                  height={30}
                  alt="flag"
                  style={{
                    border: "1px solid",
                    borderRadius: "5px",
                    margin: "0 auto",
                  }}
                />
                <span>{obj.awayName}</span>
                <input type="number" min={0} defaultValue={0} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

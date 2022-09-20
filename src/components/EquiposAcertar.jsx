import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

export const EquiposAcertar = () => {
  const [data, setData] = useState([]);

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
        // const date = new Date(obj.matchTime * 1000).toString();
        const dateMoment = moment(obj.matchTime * 1000).format("lll");

        return (
          <div key={index}>
            <h3>
              Grupo {obj.group}. {dateMoment}. Jornada eror / 3
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
                <input type="number" min={0} defaultValue={0} max={20} />
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
                <input type="number" min={0} defaultValue={0} max={20} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

// const imagess = require("../assets/Flag_of_Brazil.svg");

const images = {
  Qatar: "/static/media/Flag_of_Qatar.6045e91736f79ac4c2a8dd16e5363cca.svg",
  Ecuador: "/static/media/Flag_of_Ecuador.b41768e49a116f0389641f0a74042055.svg",
  Iran: "/static/media/Flag_of_Iran.4c6f626dadb69089cd7632c4dbc736a6.svg",
  England: "/static/media/Flag_of_England.bb74a1ef3578c871dac43701c6b1c165.svg",
  Senegal: "/static/media/Flag_of_Senegal.587acb4a372a52a5d94b34174ea34c4c.svg",
  Netherlands:
    "/static/media/Flag_of_the_Netherlands.299ae45634b3bb13ffc30b233a8eb2e2.svg",

  USA: "/static/media/Flag_of_USA.33c8035805d0139924dd472c4d5b3adf.svg",
  Wales: "/static/media/Flag_of_Wales.4a42ac30b172bcacbef4815525e22ff9.svg",
  Argentina:
    "/static/media/Flag_of_Argentina.f79ee67af3762f52c41f7216313bafc4.svg",
  "Saudi Arabia":
    "/static/media/Flag_of_Saudi_Arabia.0cce078c871825d495b54928c27ededf.svg",
  Denmark: "/static/media/Flag_of_Denmark.1b636b044e031177f7b1121f7143e6cb.svg",
  Tunisia: "/static/media/Flag_of_Tunisia.e0e889d93f7c1d69b938760f405b1360.svg",
  Mexico: "/static/media/Flag_of_Mexico.1412abe02b562c2a547225d11fb80c0d.svg",
  Poland: "/static/media/Flag_of_Poland.4da5f094c814970e3a2878f68eb33c40.svg",
  France: "/static/media/Flag_of_France.dd81f2cedb4074374f1a0d27d7231d97.svg",
  Australia:
    "/static/media/Flag_of_Australia.ecce2f446d87cccba320718e6642e34a.svg",
  Morocco: "/static/media/Flag_of_Morocco.f880f7746e36f330a62719213bcdce0e.svg",
  Croatia: "/static/media/Flag_of_Croatia.de3d560b987ccc06d554bd1bca5c365d.svg",
  Germany: "/static/media/Flag_of_Germany.1708c5f78a40e2382860bd1a6fc03353.svg",
  Japan: "/static/media/Flag_of_Japan.c4b1f700c50818f752e2c42d39592a36.svg",
  Spain: "/static/media/Flag_of_Spain.d0c4a6137c26462ea243ab2d90bd8dd7.svg",
  "Costa Rica":
    "/static/media/Flag_of_Costa_Rica.6264adf362bbcf7d78e60d02d7638a3a.svg",
  Belgium: "/static/media/Flag_of_Belgium.bd884fd68fd30c1cb1c6550032d37700.svg",
  Canada: "/static/media/Flag_of_Canada.259890dcc467e7b2f6b7ccbffd182c9e.svg",
  Switzerland:
    "/static/media/Flag_of_Switzerland.6f88028e1536a49a2ad6485d603f33e0.svg",
  Cameroon:
    "/static/media/Flag_of_Cameroon.5134c92faecad26d0754b431a5d79c42.svg",
  Uruguay: "/static/media/Flag_of_Uruguay.1f0cf59e9ba3cd4feade8081f0e9b7d8.svg",
  "South Korea":
    "/static/media/Flag_of_South_Korea.a685247ddb8f127cf43a0c45e40150d9.svg",
  Portugal:
    "/static/media/Flag_of_Portugal.0defa2ab8d926ecb06e4b983fdfe8af5.svg",
  Ghana: "/static/media/Flag_of_Ghana.46249478c6508daec7090eabc6eeea82.svg",
  Brazil: "/static/media/Flag_of_Brazil.62e1c5da3916cece2a3fd3d78f4fcd53.svg",
  Serbia: "/static/media/Flag_of_Serbia.ffc254b35f3147dbdc91.png",
};

export const EquiposAcertar = () => {
  const [data, setData] = useState([]);

  // console.log(imagess);

  const peticion = () => {
    axios
      .get(
        "http://api.isportsapi.com/sport/football/schedule?api_key=7ysUHBwXouU3Bb48&leagueId=1572"
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
      {/* <img
        src="/static/media/Flag_of_Uruguay.1f0cf59e9ba3cd4feade8081f0e9b7d8.svg"
        width={60}
        height={30}
        alt="flag"
        style={{
          border: "1px solid",
          borderRadius: "5px",
          margin: "0 auto",
        }}
      /> */}

      {data?.map((obj, index) => {
        // console.log(obj);
        // const date = new Date(obj.matchTime * 1000).toString();
        const dateMoment = moment(obj.matchTime * 1000).format("lll");
        const { homeName, awayName } = obj;
        // console.log(homeName);
        // const x = obj.name.find();

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
                  // src="../assets/Flag_of_Ecuador.svg"
                  src={images?.[homeName]}
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
                  // src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg"
                  // src={images.ecuador}
                  src={images?.[awayName]}
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

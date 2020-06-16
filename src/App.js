import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  // state del formulario
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
  });
  const [consultar, guardarConsultar] = useState(false);
  const [resultadoo, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);
  const [posicionActual, guardarPosicionActual] = useState(null);

  const { ciudad } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        /*         const appId = "b5dc8424fefb0568753fc06c8be1b7ad";
         */ //    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&&appid=${process.env.REACT_APP_ACCESS_KEY}`;

        /*  https://api.openweathermap.org/data/2.5/forecast?q=Istambul&units=metric&appid=b5dc8424fefb0568753fc06c8be1b7ad
        https://api.openweathermap.org/data/2.5/forecast/daily?q=Istambul&units=metric&&appid=ed7b34986576a0b179ebbcefd31ade9a
 */

        const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${ciudad}&units=metric&&appid=${process.env.REACT_APP_ACCESS_KEY}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        console.log(resultado);

        guardarConsultar(false);

        // Detecta si hubo resultados correctos en la consulta

        if (resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
          guardarResultado({ list: resultado.list.splice(0, 5) });
        }
      }
    };
    const fetchData = async () => {
      try {
        const url = `http://ip-api.com/json/`;
        const respuesta = await fetch(url);
        const result = await respuesta.json();
        guardarPosicionActual(result.city);
      } catch (e) {
        alert("there was an error");
      }
    };
    fetchData();
    consultarAPI();
    // eslint-disable-next-line
  }, [consultar]);

  /*  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultados" />;
  } else {
    componente = true;
  } */
  //const resultadoo = { name: "nuvoso", main: 3434.324 };

  return (
    <Fragment>
      <Header titulo="Clima React App" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row center">
            <div className="col m12 s12">
              <Formulario
                posicionActual={posicionActual}
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
          </div>
          <div className="row">
            <div className="contenedor-climas">
              {error ? (
                <Error mensaje="No hay resultados" />
              ) : (
                resultadoo.list !== undefined &&
                resultadoo.list.map((item) => (
                  <Clima
                    /* key={item.city.id}  */ resultado={item}
                    name={ciudad}
                  />
                ))
              )}
            </div>
            {/* <div className="col m6 s12">{componente}</div> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;

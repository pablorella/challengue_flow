import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";
import Loading from "./components/Loading";

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
        const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${ciudad}&units=metric&&appid=${process.env.REACT_APP_ACCESS_KEY}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

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

  if (!posicionActual || !resultadoo) return <Loading />;

  return (
    <Fragment>
      <Header titulo="Clima React App" />

      <div className="container">
        <div className="row">
          <div className="col m12 s12">
            <Formulario
              posicionActual={posicionActual}
              busqueda={busqueda}
              guardarBusqueda={guardarBusqueda}
              guardarConsultar={guardarConsultar}
              guardarResultado={guardarResultado}
            />
          </div>
        </div>
        <div className="row">
          <div className="col m12 s12 contenedor-climas">
            {error ? (
              <Error mensaje="No hay datos" />
            ) : (
              resultadoo.list !== undefined &&
              resultadoo.list.map((item) => (
                <Clima key={item.dt} resultado={item} name={ciudad} />
              ))
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;

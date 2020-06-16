import React from "react";
import PropTypes from "prop-types";

const Clima = (props) => {
  // extraer los valores
  const name = props.name;
  const main = props.resultado;

  if (!name) return null;

  // Grados kelvin
  const kelvin = 0;
  console.log(main);

  return (
    <div className="card-panel white">
      <div className="black-text">
        {/*  <h2>El clima de {name} es: </h2> */}
        <p className="temperatura">{main.weather[0].main}</p>

        <img
          src={
            "http://openweathermap.org/img/wn/" + main.weather[0].icon + ".png"
          }
          alt="nombrealternativo"
        />
        <p className="temperatura">
          {parseFloat(main.temp.day - kelvin, 10).toFixed(2)}{" "}
          <span> &#x2103; </span>
        </p>
        <p>
          Temperatura Máxima:
          {parseFloat(main.temp.max - kelvin, 10).toFixed(2)}{" "}
          <span> &#x2103; </span>
        </p>
        <p>
          Temperatura Minima:
          {parseFloat(main.temp.min - kelvin, 10).toFixed(2)}{" "}
          <span> &#x2103; </span>
        </p>
        <p>
          Humidity:
          {main.humidity}
          <span> % </span>
        </p>
      </div>
    </div>
  );
};

Clima.propTypes = {
  resultado: PropTypes.object.isRequired,
};

export default Clima;

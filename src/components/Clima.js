import React from "react";
import PropTypes from "prop-types";

const Clima = (props) => {
  const name = props.name;
  const main = props.resultado;

  if (!name) return null;

  return (
    <div className="card">
      <div className="black-text">
        <p className="temperatura">{main.weather[0].main}</p>
        <img
          src={
            "http://openweathermap.org/img/wn/" + main.weather[0].icon + ".png"
          }
          alt="imagen del tiempo"
        />
        <p className="temperatura">
          {parseFloat(main.temp.day, 10).toFixed(2)} <span> &#x2103; </span>
        </p>
        <p className="temperatura">
          {new Date(main.dt * 1000).getDate()}-{" "}
          {new Date(main.dt * 1000).getMonth() + 1}{" "}
        </p>

        <p>
          Máxima:
          {parseFloat(main.temp.max, 10).toFixed(2)} <span> &#x2103; </span>
        </p>
        <p>
          Mínima:
          {parseFloat(main.temp.min, 10).toFixed(2)} <span> &#x2103; </span>
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

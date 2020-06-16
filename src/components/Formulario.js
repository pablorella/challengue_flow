import React, { useState } from "react";
import Error from "./Error";
import PropTypes from "prop-types";
//import Loading from "./Loading.js";

//const [posicionActual, guardarPosicionActual] = useState(null);

const Formulario = ({
  busqueda,
  guardarBusqueda,
  guardarConsultar,
  posicionActual,
}) => {
  const [error, guardarError] = useState(false);

  // extraer ciudad
  const { ciudad } = busqueda;
  //const { posicionActual } = posicionActual;

  const handleChange = (e) => {
    // actualizar el state
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // validar
    if (ciudad.trim() === "") {
      guardarError(true);
      return;
    }

    guardarError(false);

    guardarConsultar(true);
  };

  //console.log("la posicion actual es :" + posicionActual);
  //if (!posicionActual) return <Loading />;
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-field col s12">
        <select
          name="ciudad"
          id="ciudad"
          value={ciudad}
          onChange={handleChange}
        >
          <option value={posicionActual}>{posicionActual}</option>
          <option value="París">París</option>
          <option value="Istambul">Istambul</option>
          <option value="beirut">beirut</option>
          <option value="Venecia">Venecia</option>
          <option value="wuhan">wuhan</option>
          <option value="cartagena">cartagena</option>
        </select>
        <label htmlFor="ciudad">Ciudad: </label>
      </div>

      <div className="input-field col s12">
        <input
          type="submit"
          value="Buscar Clima"
          className=" btn-large btn-block yellow accent-4"
        />
      </div>
    </form>
  );
};

Formulario.propTypes = {
  busqueda: PropTypes.object.isRequired,
  guardarBusqueda: PropTypes.func.isRequired,
  guardarConsultar: PropTypes.func.isRequired,
  posicionActual: PropTypes.object.isRequired,
};

export default Formulario;

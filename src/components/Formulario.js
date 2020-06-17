import React, { useState } from "react";
import Error from "./Error";
import PropTypes from "prop-types";

const Formulario = ({
  busqueda,
  guardarBusqueda,
  guardarConsultar,
  posicionActual,

  guardarResultado,
}) => {
  const [error, guardarError] = useState(false);

  // extraer ciudad
  const { ciudad } = busqueda;

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
      guardarConsultar(false);
      guardarResultado({});
      return;
    }

    guardarError(false);

    guardarConsultar(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error mensaje="Es obligatorio ingresar una ciudad" /> : null}

      <div className="input-field col s12">
        <label htmlFor="ciudad">Ciudad: </label>
        <select
          className="form-control"
          name="ciudad"
          id="ciudad"
          onChange={handleChange}
        >
          <option value="">-- Seleccione una Ciudad --</option>
          <option value={posicionActual}>{posicionActual}</option>
          <option value="París">París</option>
          <option value="Istambul">Istambul</option>
          <option value="Beirut">Beirut</option>
          <option value="Venecia">Venecia</option>
          <option value="Wuhan">Wuhan</option>
          <option value="Cartagena">Cartagena</option>
        </select>
      </div>

      <div className="input-field col s12">
        <input
          type="submit"
          value="Buscar Clima"
          className="mb-2 mt-5 btn btn-info btn-block yellow accent-4"
        />
      </div>
    </form>
  );
};

Formulario.propTypes = {
  busqueda: PropTypes.object.isRequired,
  guardarBusqueda: PropTypes.func.isRequired,
  guardarConsultar: PropTypes.func.isRequired,
  posicionActual: PropTypes.string.isRequired,
  guardarResultado: PropTypes.func.isRequired,
};

export default Formulario;

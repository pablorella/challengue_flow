import React from "react";
import PropTypes from "prop-types";

const Header = ({ titulo }) => {
  return (
    <nav>
      <div className="titulo">
        <h1>{titulo}</h1>
      </div>
    </nav>
  );
};

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
};

export default Header;

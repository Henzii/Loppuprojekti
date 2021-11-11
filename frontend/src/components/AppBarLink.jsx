import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const AppBarLink = ({ to, text }) => (
  <NavLink className="navilinkki" to={to}>{text}</NavLink>
);

AppBarLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
export default AppBarLink;

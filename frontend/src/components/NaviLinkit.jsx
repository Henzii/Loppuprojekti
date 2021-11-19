import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import HideIfNotLogged from './HideIfNotLogged';

const NaviLinkit = ({ Wrap }) => (
  <>
    <AppBarLink to="/" text="Etusivu" Wrap={Wrap} />
    <AppBarLink to="/competitions" Wrap={Wrap} text="Kisat" />
    <HideIfNotLogged>
      <AppBarLink to="/stats" Wrap={Wrap} text="Stats" />
      <AppBarLink to="/settings" Wrap={Wrap} text="Settings" />
      <AppBarLink to="/upload" Wrap={Wrap} text="Upload" />
      <AppBarLink to="/logs" Wrap={Wrap} text="Logs" />
    </HideIfNotLogged>
  </>
);

const AppBarLink = ({ to, text, Wrap }) => {
  if (!Wrap) return <NavLink className="navilinkki" to={to}>{text}</NavLink>;
  return <Wrap><NavLink className="navilinkki" to={to}>{text}</NavLink></Wrap>;
};

AppBarLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  Wrap: PropTypes.shape(),
};
AppBarLink.defaultProps = {
  Wrap: null,
};
NaviLinkit.propTypes = {
  Wrap: PropTypes.shape(),
};
NaviLinkit.defaultProps = {
  Wrap: null,
};

export default NaviLinkit;

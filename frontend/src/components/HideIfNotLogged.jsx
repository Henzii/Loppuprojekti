import React from 'react';
import PropTypes from 'prop-types';
import { useLoggedIn } from './LoggedUserProvider';

const HideIfNotLogged = ({ children }) => {
  const loggedIn = useLoggedIn();
  if (!loggedIn) return (<></>);

  return (
    <>
      {children}
    </>
  );
};

HideIfNotLogged.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default HideIfNotLogged;

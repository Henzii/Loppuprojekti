import React from 'react';
import PropTypes from 'prop-types';
import { useLoggedIn } from './LoggedUserProvider';

const HideIfNotLogged = ({ children, rooli }) => {
  const { me: loggedIn } = useLoggedIn();
  if (!loggedIn || (rooli !== '' && loggedIn.rooli !== rooli)) return (<></>);

  return (
    <>
      {children}
    </>
  );
};
HideIfNotLogged.defaultProps = {
  rooli: '',
};
HideIfNotLogged.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.shape(),
  ]).isRequired,
  rooli: PropTypes.string,
};

export default HideIfNotLogged;

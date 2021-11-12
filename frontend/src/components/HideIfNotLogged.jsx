import React from 'react';
import PropTypes from 'prop-types';
import useMe from '../hooks/useMe';

const HideIfNotLogged = ({ children }) => {
  const me = useMe();
  if (!me) return (<></>);

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

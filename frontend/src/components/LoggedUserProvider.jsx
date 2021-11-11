import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useMe from '../hooks/useMe';

const UserContext = createContext();

export const useLoggedIn = () => useContext(UserContext);

const LoggedUserProvider = ({ children }) => {
  const me = useMe();
  return (
    <UserContext.Provider value={me}>
      {children}
    </UserContext.Provider>
  );
};

LoggedUserProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LoggedUserProvider;

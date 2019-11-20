import React, { createContext, useReducer } from 'react';

const UserContext = createContext();

const initialState = {
  isAuthenticated: false,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      return { isAuthenticated: true };
    }
    case 'LOGOUT_SUCCESS': {
      return { isAuthenticated: false };
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};

const UserProvider = props => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <UserContext.Provider value={value} {...props} />;
};

const useUser = () => {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error(`useUser must be used within a UserProvider`);
  }

  const [state, dispatch] = context;

  const loginSuccess = () =>
    dispatch({ type: 'LOGIN_SUCCESS' });

  const logoutSuccess = () =>
    dispatch({ type: 'LOGOUT_SUCCESS' });

  return {
    state,
    dispatch,
    loginSuccess,
    logoutSuccess,
  };
};

export { UserProvider, useUser };

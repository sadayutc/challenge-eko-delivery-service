import React, { createContext, useReducer } from 'react';

const RouteContext = createContext();

const initialState = {
  routesData: null,
};

const routeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GRAPH_DATA': {
      return { routesData: action.payload.routesData };
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};

const RouteProvider = props => {
  const [state, dispatch] = useReducer(routeReducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <RouteContext.Provider value={value} {...props} />;
};

const useRoute = () => {
  const context = React.useContext(RouteContext);

  if (!context) {
    throw new Error(`useRoute must be used within a RouteProvider`);
  }

  const [state, dispatch] = context;

  const setRoutesData = routesData =>
    dispatch({ type: 'SET_GRAPH_DATA', payload: { routesData } });

  return {
    state,
    dispatch,
    setRoutesData,
  };
};

export { RouteProvider, useRoute };

import React, { createContext, useReducer } from 'react';

const LayoutContext = createContext();

const initialState = {
  headerTitle: '',
  isMobileSidebarOpen: false,
};

const layoutReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_MOBILE_SIDEBAR_OPEN': {
      return { isMobileSidebarOpen: !state.isMobileSidebarOpen };
    }
    case 'SET_HEADER_TITLE': {
      return { headerTitle: action.payload.headerTitle };
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};

const LayoutProvider = props => {
  const [state, dispatch] = useReducer(layoutReducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <LayoutContext.Provider value={value} {...props} />;
};

const useLayout = () => {
  const context = React.useContext(LayoutContext);

  if (!context) {
    throw new Error(`useLayout must be used within a LayoutProvider`);
  }

  const [state, dispatch] = context;

  const toggleMobileSidebarOpen = () =>
    dispatch({ type: 'TOGGLE_MOBILE_SIDEBAR_OPEN' });

  const setHeaderTitle = (headerTitle) =>
    dispatch({ type: 'SET_HEADER_TITLE', payload: { headerTitle } });

  return {
    state,
    dispatch,
    toggleMobileSidebarOpen,
    setHeaderTitle,
  };
};

export { LayoutProvider, useLayout };

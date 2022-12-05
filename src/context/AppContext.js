import PropTypes from 'prop-types';
import { createContext, useMemo, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [API, setAPI] = useState([]);

  const context = useMemo(() => (
    {
      API,
      setAPI,
    }
  ), [API]);

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

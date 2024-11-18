import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { UNSAFE_DataRouterContext, UNSAFE_RouteContext } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Configure React Router future flags
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UNSAFE_DataRouterContext.Provider value={router}>
      <UNSAFE_RouteContext.Provider value={{ outlet: null, matches: [], isDataRoute: false }}>
        <App />
      </UNSAFE_RouteContext.Provider>
    </UNSAFE_DataRouterContext.Provider>
  </StrictMode>
);
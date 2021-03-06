import React from 'react';
import { BrowserRouter, RouteProps } from 'react-router-dom';
import Router from './Router';
import UserProvider from "./contexts/providers/UserProvider";
import AppProvider from "./contexts/providers/AppProvider";

const App: React.FC<RouteProps> = (props) => {

  return (
    <AppProvider>
      <UserProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </UserProvider>
    </AppProvider>
  );
};

export default App;
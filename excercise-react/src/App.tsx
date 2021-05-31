import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';

const App = () => {
  function getRoutes() {
    return routes.map((route, index) => <Route key={index} {...route} />);
  }

  return <Switch>{getRoutes()}</Switch>;
};

export default App;

import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import routes from '../../routes';
import { lazyComponent } from '../../utils/lazyLoad';

const AppRouter = () => {
  const getRoutes = () => {
    return routes.map(({ path, exact, component }, index) => (
      <Route key={index} path={path} exact={exact} component={lazyComponent(component)} />
    ));
  };

  return (
    <Suspense fallback={<Loading />}>
      <Switch>{getRoutes()}</Switch>
    </Suspense>
  );
};

export default AppRouter;

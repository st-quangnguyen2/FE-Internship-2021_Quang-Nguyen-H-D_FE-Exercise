import { lazy } from 'react';

export const lazyComponent = (componentName: string) => {
  return lazy(() => import(`../components/${componentName}`));
};

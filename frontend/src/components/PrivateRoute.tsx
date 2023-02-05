import React, { LazyExoticComponent } from 'react';
import { Navigate, BrowserRouterProps, Route } from 'react-router-dom';

interface IPrivateRouteProps extends BrowserRouterProps {
  component: React.ComponentType<BrowserRouterProps> | LazyExoticComponent<any>;
  isAuthenticated: boolean;
  redirectLink: string;
  path?: string;
}

const PrivateRoute = ({ component: Component, ...props }: IPrivateRouteProps) => {
  if (!Component) return null;

  return props.isAuthenticated
    ? <Route path={props.path} element={<Component />} />
    : <Navigate to={props.redirectLink} />
}

export default PrivateRoute;
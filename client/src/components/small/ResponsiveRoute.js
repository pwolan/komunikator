import React from "react";
import { Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { theme } from "theme/theme";
import PropTypes from "prop-types";

const ResponsiveRoute = ({ path, exact, mrender, mcomponent, drender, dcomponent }) => {
  const isDesktop = useMediaQuery({ minWidth: parseInt(theme.media.large) });
  if (isDesktop) {
    return <Route to={path} exact={exact} render={drender} component={dcomponent} />;
  } else {
    return <Route to={path} exact={exact} render={mrender} component={mcomponent} />;
  }
};
ResponsiveRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  mrender: PropTypes.func,
  drender: PropTypes.func,
  mcomponent: PropTypes.elementType,
  dcomponent: PropTypes.elementType,
};
export default ResponsiveRoute;

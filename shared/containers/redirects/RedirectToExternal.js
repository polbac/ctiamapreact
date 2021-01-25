import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const RedirectToExternal = ({ exact, path, push, to }) => (
  <Route
    exact={exact}
    path={path}
    component={({ location }) => {
      const url = `${to}${!exact ? location.pathname : ''}`;
    // component={() => {
    //   const url = `${to}`;

      if (typeof window !== 'undefined') {
        window.location = url;
        return null;
      }

      return (
        <Redirect to={url} push={push} />
      );
    }}
  />
);

RedirectToExternal.propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string,
  push: PropTypes.bool,
  to: PropTypes.string,
};

export default RedirectToExternal;

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';

const RedirectWithParams = ({ exact, from, push, to }) => {
  const pathTo = pathToRegexp.compile(to);

  return (
    <Route
      exact={exact}
      path={from}
      component={({ match: { params } }) => (
        <Redirect to={pathTo(params)} push={push} />
      )}
    />
  );
};

RedirectWithParams.propTypes = {
  exact: PropTypes.bool,
  from: PropTypes.string,
  push: PropTypes.bool,
  to: PropTypes.string,
};

export default RedirectWithParams;

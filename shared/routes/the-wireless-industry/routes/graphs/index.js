import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import Editor from './routes/editor';
import Graph from './routes/graph';
import Graphs from './Graphs';

const GraphsRoute = ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}/editor`} component={Editor} />
    <Route exact path={`${match.path}`} component={Graphs} />
    <Route path={`${match.path}/:slug`} component={Graph} />
  </Switch>
);

GraphsRoute.propTypes = {
  match: PropTypes.object,
};

export default GraphsRoute;

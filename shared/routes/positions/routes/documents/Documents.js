import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import NotFound from 'routes/not-found';
import Home from './routes/home';
import Detail from './routes/detail';

export default class Documents extends PureComponent {

  static propTypes = {
    location: PropTypes.object,
    match: PropTypes.object,
  };

  render() {
    const { location, match } = this.props;

    return (
      <Switch location={location}>
        <Route exact path={`${match.path}/:slug`} component={Detail} />
        <Route exact path={`${match.path}`} component={Home} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

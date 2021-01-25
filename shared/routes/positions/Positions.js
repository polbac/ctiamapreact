import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';

import Page from 'routes/page';
import NotFound from 'routes/not-found';

import Documents from './routes/documents';

export default class extends PureComponent {

  static propTypes = {
    match: PropTypes.object,
  }

  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route path={`${match.path}/documents`} component={Documents} />
        <Route exact path={`${match.path}/:slug+`} component={Page} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

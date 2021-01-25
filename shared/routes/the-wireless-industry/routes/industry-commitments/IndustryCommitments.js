import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';

import List from './routes/list';
import View from './routes/view';

export default class extends PureComponent {

  static propTypes = {
    match: PropTypes.object,
  }

  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route path={`${match.path}/:guideline`} component={View} />
        <Route path={`${match.path}`} component={List} />
      </Switch>
    );
  }
}

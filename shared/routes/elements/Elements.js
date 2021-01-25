import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Switch, Route, Link } from 'react-router-dom';

import Header from 'containers/header';

import Layout, { Group } from 'components/layout';
import Segment from 'components/segment';

import LayoutRoute from './Layout';
import Heroes from './Heroes';
import Forms from './Forms';
import Graphics from './Graphics';
import Numbers from './Numbers';
import Maps from './Maps';

export default class Elements extends PureComponent {

  static propTypes = {
    match: PropTypes.object,
  }

  render() {
    const { match } = this.props;

    return (
      <Layout>
        <Helmet title="Home" />

        <Header />

        <Group>
          <Segment>
            <h1>Elements</h1>

            <ul>
              <li><Link to={`${match.path}/layout`}>Layout / Groups</Link></li>
              <li><Link to={`${match.path}/heroes`}>Heroes</Link></li>
              <li><Link to={`${match.path}/forms`}>Forms</Link></li>
              <li><Link to={`${match.path}/graphics`}>Graphics</Link></li>
              <li><Link to={`${match.path}/numbers`}>Numbers</Link></li>
              <li><Link to={`${match.path}/maps`}>Maps</Link></li>
            </ul>
          </Segment>
        </Group>

        <Switch>
          <Route path={`${match.path}/layout`} component={LayoutRoute} />
          <Route path={`${match.path}/heroes`} component={Heroes} />
          <Route path={`${match.path}/forms`} component={Forms} />
          <Route path={`${match.path}/graphics`} component={Graphics} />
          <Route path={`${match.path}/numbers`} component={Numbers} />
          <Route path={`${match.path}/maps`} component={Maps} />
        </Switch>
      </Layout>
    );
  }
}

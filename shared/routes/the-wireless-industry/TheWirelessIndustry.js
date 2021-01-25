import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router';
import NotFound from 'routes/not-found';
import Page from 'routes/page';
import Graphs from './routes/graphs';
import WirelessIndustry from './routes/wireless-industry';
import FiveG from './routes/five-g';
import IndustryCommitments from './routes/industry-commitments';
import Map from './routes/map';
import CovidRemoteLearning from './routes/covid-remote-learning';

export default class extends PureComponent {

  static propTypes = {
    match: PropTypes.object,
  }

  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Redirect exact path="/the-wireless-industry/the-race-to-5g" to="/the-wireless-industry/the-5g-economy" />
        <Redirect exact path="/the-wireless-industry/managing_our_wireless_networks-covid-19" to="/homepage/covid-19#network-performance" />

        <Route path={`${match.path}/infographics-library`} component={Graphs} />
        <Route path={`${match.path}/industry-commitments`} component={IndustryCommitments} />
        <Route path={`${match.path}/map/:version(5g|4g)`} component={Map} />
        <Route exact path={`${match.path}/the-5g-economy`} component={FiveG} />
        <Route exact path={`${match.path}/wireless-industry`} component={WirelessIndustry} />
        <Route exact path={`${match.path}/remote-learning-i5c8m1x`} component={CovidRemoteLearning} />
        <Route exact path={`${match.path}/:slug+`} component={Page} />
        <Route component={NotFound} />

      </Switch>
    );
  }
}

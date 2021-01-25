import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';

import Page from 'routes/page';
import NotFound from 'routes/not-found';
import Redirects from 'containers/redirects/Redirects';

import BoardOfDirectors from './routes/board-of-directors';
import OurMembers from './routes/our-members';
import OurTeam from './routes/our-team';
import TeamMember from './routes/our-team/routes/member';
import ContactUs from './routes/contact-us';
import BecomeAMember from './routes/become-a-member';
import OurMission from './routes/our-mission';

export default class extends PureComponent {

  static propTypes = {
    match: PropTypes.object,
  }

  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.path}/board-of-directors`} component={BoardOfDirectors} />
        <Route exact path={`${match.path}/our-members`} component={OurMembers} />
        <Route exact path={`${match.path}/the-ctia-team`} component={OurTeam} />
        <Route exact path={`${match.path}/the-ctia-team/:member`} component={TeamMember} />
        <Route exact path={`${match.path}/our-mission`} component={OurMission} />
        <Route exact path={`${match.path}/contact-us`} component={ContactUs} />
        <Route exact path={`${match.path}/become-a-member`} component={BecomeAMember} />
        <Route exact path={`${match.path}/programs/certification-resources/test-plans`} component={Redirects} />
        <Route exact path={`${match.path}/test-plans`} component={Redirects} />
        <Route exact path={`${match.path}/careers`} component={Redirects} />
        <Route exact path={`${match.path}/:slug+`} component={Page} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

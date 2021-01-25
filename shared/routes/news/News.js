import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import NotFound from 'routes/not-found';
import Home from './routes/home';
import EventPage from './routes/event-page';
import Posts from './routes/posts';
import Post from './routes/post';

export default class Positions extends PureComponent {

  static propTypes = {
    location: PropTypes.object,
    match: PropTypes.object,
  };

  render() {
    const { location, match } = this.props;

    const blog = (<Posts category="blog" copy="" label="News" title="Blog" />);
    //const pressReleases = (<Posts category={['press-release', 'statement']} copy="" label="News" title="Press Releases" />);
    const pressReleases = (<Posts category="press-release" copy="" label="News" title="Press Releases" />);
    const events = (<Posts category="event" copy="" label="News" title="Events" />);
    const reports = (<Posts category="report" copy="" label="News" title="Reports" />);
    const statements = (<Posts category="statement" copy="" label="News" title="Statements" />); 

    return (
      <Switch key={location.pathname} location={location}>
        <Route exact path={`${match.url}`} component={Home} />

        <Route exact path={`${match.url}/blog`} render={() => blog} />
        <Route exact path={`${match.url}/press-release`} render={() => pressReleases} />
        <Route exact path={`${match.url}/events`} render={() => events} />
        <Route exact path={`${match.url}/reports`} render={() => reports} />
        <Route exact path={`${match.path}/events/event-page`} component={EventPage} />
        <Route exact path={`${match.url}/statements`} render={() => statements} />

        <Route exact path={`${match.url}/:slug`} component={Post} />

        <Route component={NotFound} />
      </Switch>
    );
  }
}

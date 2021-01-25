import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { observer, inject } from 'mobx-react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import config from 'utils/config';
import ScrollRouteToTop from 'utils/ScrollRouteToTop';
import { categories } from 'utils/urlResolver';
import objectFitImages from 'object-fit-images';

// Layout
import LoadingPage from 'containers/loading-page';
import SkipNav from 'components/skip-nav';
import Footer from 'containers/footer';
import { redirectRoutes } from 'containers/redirects';
import AppLayout, { Content } from 'components/app-layout';
import DevTools from 'components/devtools';
import GsapTools from 'components/gsaptools';
import Analytics from 'components/analytics';

// Routes
import Home from './routes/home';
import Sitemap from './routes/sitemap';
import News from './routes/news';
import TheWirelessIndustry from './routes/the-wireless-industry';
import EventPage from './routes/news/routes/event-page';
import Positions from './routes/positions';
import AboutCtia from './routes/about-ctia';
import Elements from './routes/elements';
import Search from './routes/search';
import Page from './routes/page';
import Print from './routes/print';
import NotFound from './routes/not-found';
import RedirectToExternal from '../shared/containers/redirects/RedirectToExternal';

const SIGNUP_PATH = '/mobile-minute-signup';

class App extends Component {

  static propTypes = {
    location: PropTypes.object,
    ui: PropTypes.object,
  }

  componentDidMount() {
    const { location, ui } = this.props;
    const isSignup = location.pathname === SIGNUP_PATH;

    if (isSignup) {
      ui.isSignupVisible = true;
      ui.isScrollDisabled = true;
    }

    objectFitImages();
  }

  render() {
    const validCategories = `(${categories.map(c => c.slug).join('|')})`;

    return (
      <AppLayout>
        <Helmet {...config('helmet')} />
        <SkipNav />
        <div id="header-placeholder" />

        <Content>
          <Route component={Analytics} />
          <Route component={ScrollRouteToTop} />

          <Switch>
            <RedirectToExternal exact path="(.*/test-plans)" to="https://testplans.ctia.org" />
            <Route exact path="/" component={Home} />
            <Route exact path="/sitemap" component={Sitemap} />
            <Route exact path={SIGNUP_PATH} component={Home} />

            {/* Main Categories */}
            <Route path="/the-wireless-industry" component={TheWirelessIndustry} />
            <Route path="/positions" component={Positions} />
            <Route path="/news" component={News} />
            <Route path="/about-ctia" component={AboutCtia} />
            <Route path="/2019-5g-event" component={EventPage} />
            <Route path="/search/:query" component={Search} />

            {/* Development */}
            <Route exact path="/:type/print" component={Print} />
            <Route path="/elements" component={Elements} />
            <Route exact path="/loading-page" component={LoadingPage} />

            {/* Redirects */}
            {redirectRoutes}

            {/* Dynamic Routes */}
            <Route exact path={`/:category${validCategories}/:parentSlug?/:slug`} component={Page} />
            <Route exact path="/:slug+" component={Page} />

            <Route component={NotFound} />
          </Switch>

          <DevTools />
          <GsapTools />
        </Content>

        <Footer />
      </AppLayout>
    );
  }
}

const withInject = inject('ui')(observer(App));

export default withRouter(withInject);

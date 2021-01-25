import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect, Route } from 'react-router-dom';
import { parse } from 'utils/qs';
import NotFound from 'routes/not-found';
import RedirectWithParams from './RedirectWithParams';
import RedirectToExternal from './RedirectToExternal';

export default class Redirects extends PureComponent {

  static propTypes = {
    staticContext: PropTypes.shape({
      status: PropTypes.number,
    }),
  }

  componentWillMount() {
    const { staticContext } = this.props;

    if (staticContext) {
      staticContext.status = 301;
    }
  }

  render() {
    return (
      <Switch>
        <Redirect path="/home" to="/" />

        <Redirect exact path="/wireless-quick-facts" to="/the-wireless-industry/infographics-library" />
        <Redirect exact path="/wireless-facts" to="/the-wireless-industry/infographics-library" />
        <Redirect exact path="/industry-data/facts" to="/the-wireless-industry/infographics-library" />
        <Redirect path="/industry-data/ctia-annual-wireless-industry-survey" to="/the-wireless-industry/state-of-wireless-2018-report/" />
        <Redirect path="/industry-data/wireless-quick-facts" to="/the-wireless-industry/infographics-library/" />
        <RedirectWithParams from="/industry-data/blog-details/blog-posts/:slug" to="/news/:slug" />
        <RedirectWithParams from="/industry-data/event-details/events/:slug" to="/news/:slug" />
        <RedirectWithParams from="/industry-data/press-releases-details/press-releases/:slug" to="/news/:slug" />
        <Redirect path="/industry-data" to="/news" />

        <Redirect path="/policy/policy-position-details/911-Public-Safety" to="/positions/911-public-safety/" />
        <Redirect path="/policy/policy-position-details/open-internet" to="/positions/net-neutrality/" />
        <Redirect path="/policy/policy-position-details/policy-subtopic-details/911-Public-Safety/*" to="/positions/911-public-safety/" />
        <Redirect path="/policy/policy-position-details/safe-and-secure" to="/positions/cybersecurity" />
        <Redirect path="/policy/policy-position-details/policy-subtopic-details/privacy/*" to="/positions/privacy/" />
        <Redirect path="/policy/policy-position-details/policy-subtopic-details/spectrum/*" to="/positions/spectrum/" />
        <RedirectWithParams from="/policy/policy-position-details/:slug" to="/positions/:slug" />
        <Redirect path="/policy" to="/" />

        <Redirect path="/business_resources/certification/test_labs" to="/about-ctia/certification-resources/" />
        <Redirect path="/initiatives/certification/certification-programs" to="/about-ctia/certification-resources/" />
        <Redirect path="/initiatives/certification/ctia-authorized-test-labs" to="/about-ctia/certification-resources/" />
        <RedirectToExternal exact path="/initiatives/certification/certification-test-plans" to="https://testplans.ctia.org" />
        <RedirectToExternal exact path="/about-ctia/test-plans" to="https://testplans.ctia.org" />
        <RedirectToExternal exact path="/about-ctia/careers" to="https://careers.ctia.org" />
        <RedirectToExternal exact path="/about-ctia/programs/certification-resources/test-plans" to="https://testplans.ctia.org" />
        <Redirect exact path="/initiatives/certification" to="/about-ctia/certification-resources/" />
        <RedirectWithParams from="/initiatives/voluntary-guidelines/:slug" to="/the-wireless-industry/industry-commitments/:slug" />
        <Redirect path="/initiatives/voluntary-guidelines" to="/the-wireless-industry/industry-commitments/" />
        <Redirect path="/initiatives/ctia-show" to="/news/mobile-world-congress-americas" />
        <Redirect path="/initiatives/common-short-codes" to="/about-ctia/programs/" />
        <Redirect exact path="/initiatives" to="/about-ctia/programs/" />

        <Redirect path="/consumer-tips/robocalls" to="/consumer-resources/how-to-stop-robocalls/" />
        <Redirect path="/consumer-tips/how-wireless-emergency-alerts-help-save-lives" to="/consumer-resources/how-wireless-emergency-alerts-help-save-lives/" />
        <Redirect path="/consumer-tips/emergency-preparedness-wireless-tips" to="/consumer-resources/how-to-prepare-wireless-devices-for-emergencies/" />
        <Redirect path="/consumer-tips/choosing-a-device" to="/consumer-resources/how-to-choose-a-device" />
        <Redirect path="/consumer-tips/choosing-a-plan" to="/consumer-resources/how-to-choose-a-device" />
        <Redirect path="/consumer-tips/protecting-your-data-on-your-mobile-device" to="/consumer-resources/protecting-your-data" />
        <Redirect path="/consumer-tips/how-to-deter-smartphone-thefts-and-protect-your-data" to="/consumer-resources/protecting-your-data" />

        <Redirect path="/emergencias" to="/consumer-resources/preparacion-ante-emergencias" />

        <Redirect path="/about/our-members" to="/about-ctia/our-members/" />
        <Redirect path="/about/board-of-directors" to="/about-ctia/board-of-directors/" />
        <Redirect path="/about/the-ctia-team" to="/about-ctia/the-ctia-team/" />
        <Redirect path="/about/contact-us" to="/about-ctia/contact-us/" />

        <Redirect path="/about-ctia/become-a-member/ctia-member-benefits" to="/about-ctia/become-a-member/ctia-carrier-member-benefits/" />

        <Redirect path="/about/benefits/carrier-members" to="/about-ctia/become-a-member/ctia-carrier-member-benefits/" />
        <Redirect path="/about/benefits/industry-members" to="/about-ctia/become-a-member/ctia-industry-member-benefits/" />
        <Redirect path="/about/benefits/associate-members" to="/about-ctia/become-a-member/ctia-associate-member-benefits/" />
        <Redirect path="/about/benefits/connected-life-members" to="/about-ctia/become-a-member/ctia-connected-life-member-benefits/" />
        <Redirect exact path="/about/benefits" to="/about-ctia/become-a-member/" />
        <Redirect path="/about/benefits/*" to="/about-ctia/membership" />
        <Redirect path="/about" to="/about-ctia/our-mission" />
        <Redirect path="/footer-links/privacy-policy" to="/privacy" />
        <Redirect path="/footer-links/terms-conditions" to="/terms" />
        <Redirect path="/footer-links/sitemap" to="/sitemap" />
        <Redirect path="/your-wireless-life/consumer-tips/tips/consumer-security-privacy-tips" to="/consumer-resources/protecting-your-data" />

        <RedirectToExternal path="/images/*" to="https://api.ctia.org" />
        <RedirectToExternal path="/docs/*" to="https://api.ctia.org" />
        <RedirectToExternal exact path="/5Gin360" to="https://www.ctia5gin360.org" />
        <RedirectToExternal exact path="/connecting-kids" to="https://connectingkids.ctia.org" />
        <RedirectToExternal exact path="/how-wireless-works" to="https://howwirelessworks.ctia.org" />
        <RedirectToExternal exact path="/what-is-spectrum" to="http://whatisspectrum.ctia.org" />
        <RedirectToExternal exact path="/prepared" to="https://prepared.ctia.org" />
        <RedirectToExternal exact path="/fighting-robocalls" to="https://fightingrobocalls.ctia.org" />
        <RedirectToExternal exact path="/MWCAaccessibility" to="http://ctiait.ctia.org/mwc19/accessibility.html" />
        <RedirectToExternal exact path="/MWCApolicymakers" to="http://ctiait.ctia.org/mwc19/statePolicymaker.html" />
        <Route
          exact
          path="/search"
          component={({ location: { search } }) => {
            const query = parse(search);

            if (query.keyword) {
              return (
                <Redirect to={`/search/${query.keyword}`} />
              );
            }

            return (
              <Redirect to="/" />
            );
          }}
        />

        <Route component={NotFound} />

      </Switch>
    );
  }
}

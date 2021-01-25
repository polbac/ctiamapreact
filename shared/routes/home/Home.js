import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import Header, { WordPressHelmet } from 'containers/header';
import { Channels } from 'components/header';
import Layout, { Group } from 'components/layout';
import Ctas, { Cta } from 'components/ctas';
import HeadingButton from 'components/heading-button';

import { permalinkResolver } from 'utils/urlResolver';

import Banner from './components/banner';
import LatestNews from './containers/latest-news';
import Reports from './containers/reports';
import Hero, { Slide } from './components/hero';
import Grid from './components/grid';
import OurMission from './components/our-mission';
import s from './Home.scss';

class Home extends Component {

  static propTypes = {
    jobResult: PropTypes.array,
  };

  static defaultProps = {
    jobResult: [],
  }

  state = {
    colsCta1: 5,
    colsCta2: 7,
  };

  tabIndexNum = 0; // Final number set in totalNumberTabIndex()
  tabIndexNumChannels = 0; // Final number set in totalNumChannels()

  componentDidMount() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
    this.totalNumChannels();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = (e) => {
    if (window.matchMedia('(min-width: 1281px)').matches) {
      this.setState({ colsCta1: 5, colsCta2: 7 });
    }
    if (window.matchMedia('(min-width: 540px) and (max-width: 1280px)').matches) {
      this.setState({ colsCta1: 12, colsCta2: 12 });
    }
  }

  // This function is passed as a prop to /containers/Header.js. It's there
  // that we need to also grab the side items to add to the total.
  totalNumberTabIndex = (num) => {
    this.tabIndexNum = num;
  }

  totalNumChannels = () => {
    // Total number of links for Channels
    const channelsOnly = this.props.jobResult[0].slice(-1);

    this.tabIndexNumChannels = channelsOnly[0].items.length;
  }

  handleHeroButton = (e, c) => {
    if (e.key === 'Enter') {
      window.location.href = c.to;
    }
  }

  getFuncFromChild = (func) => {
    this.setState({
      closeHeader: func,
    });
  }

  render() {

    const {
      jobResult: [
        menu = [],
        page = {},
        news = [],
        reports = [],
      ] = [],
    } = this.props;

    const channels = menu.find(i => i.id === 'popular-channels');

    const {
      fields: {
        banner = null,
        banner_url: bannerUrl = '',
        show_banner: showBanner = false,
        slides = [],
        our_mission: ourMission = null,
        first_cta: firstCta = null,
        second_cta: secondCta = null,
      } = {},
      seo = {},
    } = page;

    return (
      <Layout>
        <WordPressHelmet title="Home" seo={seo} />

        <Header
          noSpacing
          totalNumberTabIndex={this.totalNumberTabIndex}
          getFuncFromChild={this.getFuncFromChild}
        />
        {channels && (
          <Channels closeHeader={this.state.closeHeader}>
            {channels.items.map((channel, index) => (
              <Link
                key={channel.id}
                to={permalinkResolver(channel.url, channel.type)}
                tabIndex={this.tabIndexNum + (index + 1)}
                closemenu={this.startClose}
              >
                {channel.title}
              </Link>
            ))}
          </Channels>
        )}
        <h1 className={s.visuallyhidden}>CTIA Home Page</h1>

        {showBanner && (
          <Banner content={banner} bannerUrl={bannerUrl} />
        )}

        <Hero id="hero" tabIndex={this.tabIndexNum + this.tabIndexNumChannels} handleHeroButton={this.handleHeroButton}>
          {slides
            .slice(0, 4)
            .filter(slide => !slide.hide)
            .map((slide, i) => {
            const {
              image = null,
              video,
              label,
              heading = '',
              button = '',
              link = '/',
              inversed,
              pattern = null,
            } = slide;

            const key = `slide-${heading}-${i}`;
            const slideID = `slide-${heading}`;
            const graphics = typeof pattern === 'string' ? pattern : undefined;

            return (
              <Slide
                buttonId={`button-${i}`}
                key={key}
                image={image || undefined}
                video={video && video.url}
                label={label}
                heading={heading}
                button={button}
                to={link}
                graphics={graphics}
                inversed={Boolean(inversed)}
              />
            );
          })}
        </Hero>

        <Group type="gray shadow">
          <Grid>
            <LatestNews heading="Latest News" data={news.slice(0, 6)} />
            <Reports heading="Reports" data={reports.slice(0, 4)} />
          </Grid>

          {ourMission && (
            <OurMission backgroundColor="#e0eced">
              <HeadingButton
                heading={ourMission.heading}
                copy={ourMission.copy}
                button={ourMission.button}
                to={ourMission.link}
              />
            </OurMission>
          )}

          <Ctas>
            {firstCta && (
              // <Cta width={5}>
              <Cta width={this.state.colsCta1}>
                <HeadingButton
                  heading={firstCta.heading}
                  copy={firstCta.copy}
                  button={firstCta.button}
                  to={firstCta.link}
                />
              </Cta>
            )}

            {secondCta && (
              // <Cta width={7}
              <Cta
                width={this.state.colsCta2}
                image={secondCta.image}
              >
                <HeadingButton
                  heading={secondCta.heading}
                  copy={secondCta.copy}
                  button={secondCta.button}
                  to={secondCta.link}
                />
              </Cta>
            )}
          </Ctas>
        </Group>
      </Layout>
    );
  }
}

const homeWithJob = withJob({
  work: async ({ wordpress }) => {
    const [menus, home] = await Promise.all([
      wordpress.menus(),
      wordpress.getHomepage(),
    ]);

    return [menus, ...home];
  },
  ErrorComponent: ({ error }) => { // eslint-disable-line
    console.error('Error rendering Home', error);
    return (
      <div />
    );
  },
})(Home);

export default inject('wordpress')(homeWithJob);

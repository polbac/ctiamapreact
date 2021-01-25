import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import isEmpty from 'lodash/isEmpty';
import { assets } from 'utils/themes';
import _kebabCase from 'lodash/kebabCase';
import scrollToElement from 'utils/scrollToElement';

import NotFound from 'routes/not-found';

import LoadingComponent from 'containers/loading-page';
import { WordPressHeader, WordPressHelmet } from 'containers/header';
import NavBar, { Wrapper as StickyNavBarWrapper } from 'components/nav-bar';
import Slices from 'components/slices';
import FooterSlices from 'components/footer-slices';
import Layout, { Group } from 'components/layout';

import PostLayout from 'routes/news/routes/post/components/layout';

class PostRoute extends Component {

  static propTypes = {
    jobResult: PropTypes.array,
    location: PropTypes.object,
  }

  render() {
    const {
      jobResult: [
        guideline = {},
      ] = [],
      location,
    } = this.props;

    if (isEmpty(guideline)) {
      return (
        <Route
          render={() => (
            <NotFound>
              <h1>Guideline was not found</h1>
            </NotFound>
          )}
        />
      );
    }

    const {
      title,
      fields: {
        components = [],
        header = {},
        footer = [],
      },
      seo = {},
    } = guideline;

    const hasComponents = components && components.length > 0;
    const hasFooter = footer && footer.length > 0;
    const pattern = 'industry';
    const groupType = 'dotted white';
    const navItems = (components && components
      .filter(x => x.include_in_navbar === true)
      .map(x => x.heading)) || [];

    return (
      <Layout>
        <WordPressHelmet title={title} seo={seo} />

        <WordPressHeader
          data={{
            ...header,
            pattern,
            alignment: 'center',
            groupType,
          }}
          title={title}
        />

        <StickyNavBarWrapper id="top">
          {navItems.length > 0 && (
            <NavBar
              name={title}
              location={location.pathname}
              theme={assets(pattern)}
              type={groupType}
            >
              {navItems.length > 0 && navItems.map((heading, i) => (
                <Link
                  key={i}
                  to={`${location.pathname}#${_kebabCase(heading)}`}
                  onClick={() => scrollToElement(`#${_kebabCase(heading)}`)}
                >
                  {heading}
                </Link>
              ))}
            </NavBar>
          )}

          <Group type="shadow gray">
            <PostLayout>
              {hasComponents && (
                <Slices
                  data={components}
                  theme={assets(pattern)}
                  isCenter
                />
              )}
            </PostLayout>
          </Group>
        </StickyNavBarWrapper>

        {hasFooter && (
          <Group type="white">
            <FooterSlices data={footer} />
          </Group>
        )}
      </Layout>
    );
  }
}

const guidelineWithJob = withJob({
  work: ({ wordpress, match }) => wordpress.getGuidelines({
    slug: match.params.guideline,
  }),
  LoadingComponent,
  ErrorComponent: ({ error }) => ( // eslint-disable-line
    <div>Error: {JSON.stringify(error)}</div>
  ),
})(PostRoute);

export default inject('wordpress')(guidelineWithJob);

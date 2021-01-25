import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import isEmpty from 'lodash/isEmpty';
import kebabCase from 'lodash/kebabCase';
import scrollToElement from 'utils/scrollToElement';
import { parse } from 'utils/qs';
import { assets } from 'utils/themes';
import { createCanonicalUrl } from 'utils/urlResolver';

// Components
import LoadingPage from 'containers/loading-page';
import { WordPressHeader, WordPressHelmet } from 'containers/header';
import Layout, { Group } from 'components/layout';
import Legacy from 'components/legacy';
import Slices from 'components/slices';
import Sections from 'containers/sections';
import FooterSlices from 'components/footer-slices';
import NavBar, { Wrapper as StickyNavBarWrapper } from 'components/nav-bar';

// Routes
import NotFound from 'routes/not-found';

class Page extends Component {

  static propTypes = {
    location: PropTypes.object,
    jobResult: PropTypes.array,
  }

  static defaultProps = {
    jobResult: [],
  }

  render() {
    const {
      location = {},
      jobResult: [page = {}] = [],
    } = this.props;

    let isPreview = false;

    if (location.search) {
      const parsed = parse(location.search);

      isPreview = parsed && parsed.preview;
    }

    if (isEmpty(page)) {
      const message = isPreview ? (<h1>Preview was not found</h1>) : (<h1>Page was not found</h1>);

      return (<Route render={() => (<NotFound>{message}</NotFound>)} />);
    }

    const {
      title = '',
      slug,
      content: legacyContent = '',
      fields: {
        components = [],
        sections = [],
        header = {},
        footer = [],
        isWide = false,
        hasPadding = true,
      } = {},
      seo = {},
    } = page;

    const {
      title: headerTitle = '',
      groupType,
    } = header;

    const hasComponents = components && components.length > 0;
    const hasSections = sections && sections.length > 0;

    const hasLegacyContent = legacyContent && legacyContent !== '';
    const hasFooter = footer && footer.length > 0;

    const navItems = components && components
      .filter(x => x.include_in_navbar === true)
      .map(x => x.heading);

    const content = (
      <Group type="gray shadow" overflowVisible hasPadding={hasPadding}>
        {hasComponents && (
          <Slices
            data={components}
            theme={assets(header.pattern)}
            isCenter
            isWide={isWide}
          />
        )}

        {hasSections && (
          <Sections data={sections} />
        )}

        {!hasComponents && hasLegacyContent && (
          <Legacy content={legacyContent} isCenter />
        )}

        {!hasSections && !hasComponents && !hasLegacyContent && (
          null
        )}
      </Group>
    );

    return (
      <Layout>
        <WordPressHelmet
          title={title}
          seo={{
            ...seo,
            canonical: seo.canonical === '' ? createCanonicalUrl('page', slug) : seo.canonical,
          }}
        />
        <WordPressHeader data={header} title={title} showChannels={hasSections} />

        <StickyNavBarWrapper id="top">
          <NavBar
            name={headerTitle || title}
            location={location.pathname}
            theme={assets(header.pattern)}
            type={groupType}
          >
            {navItems.length > 0 && navItems.map((heading, i) => (
              <Link
                key={i}
                to={`${location.pathname}#${kebabCase(heading)}`}
                onClick={() => scrollToElement(`#${kebabCase(heading)}`)}
              >
                {heading}
              </Link>
            ))}
          </NavBar>

          {content}
        </StickyNavBarWrapper>

        {hasFooter && (
          <Group>
            <FooterSlices data={footer} />
          </Group>
        )}
      </Layout>
    );
  }
}

const pageWithJob = withJob({
  work: ({ wordpress, match, location }) => {
    const parsed = parse(location.search);

    if (parsed && parsed.id && parsed.preview) {
      return wordpress.getPreview({ type: 'page', id: parsed.id });
    }

    return wordpress.getPage({
      slug: match.params.slug,
    });
  },
  LoadingComponent: () => <LoadingPage />,
  ErrorComponent: ({ error }) => ( // eslint-disable-line
    <div>Error: {JSON.stringify(error)}</div>
  ),
  shouldWorkAgain: (prevProps, nextProps) =>
    prevProps.match.params.slug !== nextProps.match.params.slug,
})(Page);

export default inject('wordpress')(pageWithJob);

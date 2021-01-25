import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';
import { dateParser } from 'utils/wordpress';
import { parse } from 'utils/qs';
import { assets } from 'utils/themes';
import scrollToElement from 'utils/scrollToElement';

import NotFound from 'routes/not-found';
import LoadingPage from 'containers/loading-page';
import { WordPressHeader, WordPressHelmet } from 'containers/header';
import MembersOnlyPrompt from 'containers/members-only-prompt';
import Slices from 'components/slices';
import FooterSlices from 'components/footer-slices';
import Layout, { Group } from 'components/layout';
import Author from 'components/author';
import Legacy from 'components/legacy';
import PostSidebar from 'components/post-sidebar';
import NavBar, { Wrapper as StickyNavBarWrapper } from 'components/nav-bar';

import Blog from './containers/Blog';
import Report from './containers/Report';
import PressRelease from './containers/PressRelease';
import Statement from './containers/Statement';
import Event from './containers/Event';
import PolicyBrief from './containers/PolicyBrief';
import Video from './containers/Video';
import PostLayout from './components/layout';

/*
function postLooksLikeEvent(post) {
  const {
    fields: {
      event = {},
    } = {},
  } = post;

  return Boolean(event.start_date || event.venue || event.address);
}

function postLooksLikeReport(post) {
  const {
    fields: {
      document: {
        size = '',
        link_to: {
          file,
          url,
        } = {},
      } = {},
    } = {},
  } = post;

  return Boolean(size || file || url);
}
*/

class PostRoute extends Component {

  static propTypes = {
    jobResult: PropTypes.object,
    location: PropTypes.object,
  }

  render() {
    const {
      jobResult: { items: [post = {}] } = { items: [] },
      location = {},
    } = this.props;

    let isPreview = false;

    if (location.search) {
      const parsed = parse(location.search);

      isPreview = parsed && parsed.preview;
    }

    if (isEmpty(post)) {
      const message = isPreview ? (<h1>Preview was not found</h1>) : (<h1>Post was not found</h1>);

      return (<Route render={() => (<NotFound>{message}</NotFound>)} />);
    }

    const {
      title,
      tags = [],
      categories = [],
      content: legacyContent = '',
      fields: {
        components = [],
        author = null,
        header = {},
        footer = [],
      },
      date = '',
      seo = {},
    } = post;

    const {
      title: headerTitle = '',
      groupType,
    } = header;

    const membersOnly = header.members_only;
    const hasComponents = components && components.length > 0;
    const hasLegacyContent = legacyContent && legacyContent !== '';
    const hasFooter = footer && footer.length > 0;
    const isCenterAligned = !author;
    const isUnlock = Boolean(get(this.props, 'location.state.isUnlock'));

    const navItems = components && components
      .filter(x => x.include_in_navbar === true)
      .map(x => x.heading);

    const meta = {
      type: categories.map(c => c.name).join(', '),
      date: dateParser(date),
    };

    if (categories.find(x => x.slug === 'blog')) {
      return <Blog post={post} />;
    }

    if (categories.find(x => x.slug === 'policy-brief')) {
      return <PolicyBrief post={post} />;
    }

    if (categories.find(x => x.slug === 'report') /* || postLooksLikeReport(post) */) {
      return <Report post={post} />;
    }

    if (categories.find(x => x.slug === 'press-release')) {
      return <PressRelease post={post} />;
    }

    if (categories.find(x => x.slug === 'event') /* || postLooksLikeEvent(post) */) {
      return <Event post={post} />;
    }

    if (categories.find(x => x.slug === 'video')) {
      return <Video post={post} />;
    }

    // default 'dynamic' template
    return (
      <Layout>
        <WordPressHelmet title={title} seo={seo} />

        <WordPressHeader
          data={header}
          title={title}
          tags={tags.map(tag => tag.name)}
          meta={meta}
          wide={Boolean(hasLegacyContent)}
        />

        {(membersOnly && !isUnlock) && <MembersOnlyPrompt />}

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

          <Group type="shadow">
            <PostLayout>
              {author && (
              <PostSidebar>
                {author && author.team_member ? (
                  <Author
                    name={author.team_member.post_title || author.team_member.title}
                    title={author.team_member.fields.title}
                    image={author.team_member.fields.image}
                  />
                ) : (
                  <Author
                    name={author && author.name}
                    title={author && author.title}
                    image={author && author.image}
                  />
                )}
              </PostSidebar>
            )}

              {hasComponents && (
              <Slices
                data={components}
                isCenter={isCenterAligned}
                theme={assets(header.pattern)}
              />
            )}

              {!hasComponents && hasLegacyContent && (
              <Legacy content={legacyContent} isCenter={isCenterAligned} />
            )}
            </PostLayout>
          </Group>
        </StickyNavBarWrapper>

        {hasFooter && (
          <Group graphics="positions">
            <FooterSlices data={footer} />
          </Group>
        )}
      </Layout>
    );
  }
}

const postRouteWithJob = withJob({
  work: ({ wordpress, match, location }) => {
    const parsed = parse(location.search);

    if (parsed && parsed.id && parsed.preview) {
      return wordpress.getPreview({ type: 'post', id: parsed.id });
    }

    return wordpress.getPosts({
      slug: match.params.slug,
    });
  },
  LoadingComponent: () => <LoadingPage center={false} />,
  ErrorComponent: ({ error }) => ( // eslint-disable-line
    <div>Error: {JSON.stringify(error)}</div>
  ),
})(PostRoute);

export default inject('wordpress')(postRouteWithJob);

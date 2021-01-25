import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { dateParser } from 'utils/wordpress';
import { assets } from 'utils/themes';
import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';
import scrollToElement from 'utils/scrollToElement';

import { WordPressHeader, WordPressHelmet } from 'containers/header';
import MembersOnlyPrompt from 'containers/members-only-prompt';
import Slices from 'components/slices';
import FooterSlices from 'components/footer-slices';
import { Heading } from 'components/slices/components/heading';
import { Group } from 'components/layout';
// import Author from 'components/author';
import Legacy from 'components/legacy';
// import PostSidebar from 'components/post-sidebar';
import { Wrapper as StickyNavBarWrapper } from 'components/nav-bar';

import PostLayout from '../components/layout';
import EventInfo from '../components/event-info';
import EventBar from '../components/event-bar';

class Event extends PureComponent {

  static propTypes = {
    post: PropTypes.object,
    location: PropTypes.object,
  }

  render() {
    const { post,
      location = {} } = this.props;

    const {
      title,
      tags = [],
      categories = [],
      content: legacyContent = '',
      fields: {
        components = [],
        header = {},
        footer = [],
        event = {},
      },
      date = '',
      seo = {},
    } = post;

    const meta = {
      type: categories.map(c => c.name).join(', '),
      date: dateParser(event.start_date || date) + (event.end_date ? ` - ${dateParser(event.end_date)}` : ''),
    };

    const {
      title: headerTitle = '',
      groupType,
    } = header;

    const navItems = components && components
      .filter(x => x.include_in_navbar === true)
      .map(x => x.heading.replace(/\.$/, ''));

    // Inject About heading
    if (event.show_event_info) {
      if (navItems.length > 0) {
        navItems.unshift('About');
      }
    }

    const hasComponents = components && components.length > 0;
    const hasLegacyContent = legacyContent && legacyContent !== '';
    const hasFooter = footer && footer.length > 0;
    const pattern = '';
    const membersOnly = header.members_only;
    const isUnlock = Boolean(get(this.props, 'location.state.isUnlock'));

    return (
      <Fragment>
        <WordPressHelmet
          title={title}
          seo={seo}
        />

        {(membersOnly && !isUnlock) && <MembersOnlyPrompt />}

        <WordPressHeader
          data={{
            ...header,
            pattern,
            transparent_header: false,
            hero_image: undefined,
          }}
          title={title}
          tags={tags.map(tag => tag.name)}
          meta={meta}
          wide={Boolean(hasLegacyContent)}
          backgroundImage={header.hero_image}
          video={header.video}
          isInversed={header.inversed}
        />

        <StickyNavBarWrapper id="top">

          {navItems.length > 0 && (
            <EventBar
              location={location.pathname}
              theme={assets(header.pattern)}
              type={groupType}
            >
              {navItems.map((heading, i) => (
                <Link
                  key={i}
                  to={`${location.pathname}#${kebabCase(heading)}`}
                  onClick={() => scrollToElement(`#${kebabCase(heading)}`)}
                >
                  {heading}
                </Link>
              ))}
            </EventBar>
          )}
          {/* <CustomNavBar
            location={location.pathname}
            theme={assets(header.pattern)}
            type={groupType}
          >
            <EventInfo
              startDate={event.start_date || date}
              endDate={event.end_date}
              venue={event.venue}
              address={event.address}
              buttons={event.buttons}
              map={event.map_location}
            />
          </CustomNavBar> */}

          <Group type="gray">
            <PostLayout event>

              {/* <PostSidebar>
                <EventInfo
                  startDate={event.start_date || date}
                  endDate={event.end_date}
                  venue={event.venue}
                  address={event.address}
                  buttons={event.buttons}
                  map={event.map_location}
                />
                <Author />
              </PostSidebar> */}

              {event.show_event_info && (
                <Fragment>
                  <Heading
                    id="about"
                    text="About"
                    hasDivider
                    theme={assets(header.pattern)}
                    isWide
                  />

                  <EventInfo
                    startDate={event.start_date || date}
                    endDate={event.end_date}
                    venue={event.venue}
                    address={event.address}
                    buttons={event.buttons}
                    map={event.map_location}
                  />
                </Fragment>
              )}

              {hasComponents && (
                <Slices
                  data={components}
                  theme={assets(pattern)}
                  isWide
                />
              )}

              {!hasComponents && hasLegacyContent && (
                <Legacy
                  content={legacyContent}
                />
              )}
            </PostLayout>
          </Group>
        </StickyNavBarWrapper>

        {hasFooter && (
          <Group graphics="positions">
            <FooterSlices data={footer} />
          </Group>
        )}
      </Fragment>
    );
  }
}

export default withRouter(Event);

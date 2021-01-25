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
import { Group } from 'components/layout';
import Author from 'components/author';
import Legacy from 'components/legacy';
import PostSidebar from 'components/post-sidebar';
import SidebarVideo from 'components/sidebar-video';
import NavBar, { Wrapper as StickyNavBarWrapper } from 'components/nav-bar';

import PostLayout from '../components/layout';

class Blog extends PureComponent {

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
        author = null,
        header = {},
        footer = [],
        caption = null,
        youtube_id: youtubeId = null,
        image = {},
      },
      date = '',
      seo = {},
    } = post;

    const meta = {
      type: categories.map(c => c.name).join(', '),
      date: dateParser(date),
    };

    const {
      title: headerTitle = '',
      groupType,
    } = header;

    const navItems = components && components
      .filter(x => x.include_in_navbar === true)
      .map(x => x.heading);

    const hasComponents = components && components.length > 0;
    const hasLegacyContent = legacyContent && legacyContent !== '';
    const hasFooter = footer && footer.length > 0;
    const isPressRelease = !!categories.find(x => x.slug === 'press-release');
    const isCenterAligned = !(isPressRelease || author);
    const pattern = 'article';
    const membersOnly = header.members_only;
    const isUnlock = Boolean(get(this.props, 'location.state.isUnlock'));
    const firstAuthor = get(author, 'team_member');

    const firstAuthorImage = firstAuthor
      ? get(author, 'team_member.fields.image.sizes.medium')
      : get(author, 'image.sizes.medium');

    const firstAuthorImageAlt = firstAuthor
      ? get(author,'team_member.fields.image.alt')
      : get(author, 'image.alt');

    const firstAuthorName = firstAuthor
      ? get(author, 'team_member.title')
      : get(author, 'name');

    const firstAuthorTitle = firstAuthor
      ? get(author, 'team_member.fields.title')
      : get(author, 'title');

    const hasSecondAuthor = get(author, 'has_second_author');
    const secondAuthor = hasSecondAuthor && get(author, 'second_author');

    const secondAuthorImage = secondAuthor
      ? get(author, 'second_author.fields.image.sizes.medium')
      : get(author, 'second_author_image.sizes.medium');

    const secondAuthorName = secondAuthor
      ? get(author, 'second_author.title')
      : get(author, 'second_author_name');

    const secondAuthorTitle = secondAuthor
      ? get(author, 'second_author.fields.title')
      : get(author, 'second_author_title');

    return (
      <Fragment>
        <WordPressHelmet
          title={title}
          seo={seo}
        />

        <WordPressHeader
          data={{
            ...header,
            pattern,
            alignment: 'left',
          }}
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
              <PostSidebar>

                {youtubeId && (
                <SidebarVideo
                  caption={caption}
                  youtubeId={youtubeId}
                  image={image}
                />
              )}

                <Author
                  name={firstAuthorName}
                  title={firstAuthorTitle}
                  image={{ url: firstAuthorImage, alt: firstAuthorImageAlt }}
                  hasSecondAuthor={hasSecondAuthor}
                  secondAuthorName={secondAuthorName}
                  secondAuthorTitle={secondAuthorTitle}
                  secondAuthorImage={{ url: secondAuthorImage }}
                />
              </PostSidebar>

              {hasComponents && (
              <Slices
                data={components}
                isCenter={false}
                theme={assets(pattern)}
              />
            )}

              {!hasComponents && hasLegacyContent && (
              <Legacy
                content={legacyContent}
                isCenter={isCenterAligned}
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

export default withRouter(Blog);

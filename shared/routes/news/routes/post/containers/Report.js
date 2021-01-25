import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { mimeTypeToType } from 'utils/wordpress';
import { assets } from 'utils/themes';
import { format } from 'date-fns';
import ReactHtmlParser from 'react-html-parser';
import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';
import scrollToElement from 'utils/scrollToElement';

import Header, {WordPressHelmet } from 'containers/header';
import MembersOnlyPrompt from 'containers/members-only-prompt';
import Hero, { Meta, Heading, Copy } from 'components/hero';
import Slices, {ImageCover} from 'components/slices';
import FooterSlices from 'components/footer-slices';
import { Group } from 'components/layout';
import Legacy from 'components/legacy';
import Downloader from 'components/downloader';
import NavBar, { Wrapper as StickyNavBarWrapper } from 'components/nav-bar';

import PostLayout from '../components/layout';

class Report extends PureComponent {

  static propTypes = {
    post: PropTypes.object,
    location: PropTypes.object,
  }

  render() {
    const { post,
      location = {} } = this.props;

    const {
      title,
      categories = [],
      content: legacyContent = '',
      fields: {
        components = [],
        author = null,
        header: {
          title: headerTitle,
          copy = '',
          pattern = 'positions',
          members_only: membersOnly = false,
          hero_image: heroImage = '',
          hero_image_treatment: heroTreatment = 'cover',
          groupType,
        } = {},
        footer = [],
        document: {
          size = '',
          link_to: {
            file = {},
            url,
          } = {},
          cover_image: coverImage = {},
        } = {},
      },
      date = '',
      seo = {},
    } = post;


    const navItems = components && components
      .filter(x => x.include_in_navbar === true)
      .map(x => x.heading);

    const hasComponents = components && components.length > 0;
    const hasLegacyContent = legacyContent && legacyContent !== '';
    const hasFooter = footer && footer.length > 0;
    const isPressRelease = !!categories.find(x => x.slug === 'press-release');
    const isCenterAligned = !(isPressRelease || author);
    const label = categories.map(c => c.name).join(', ');
    const type = mimeTypeToType(file.mime_type);
    const isUnlock = Boolean(get(this.props, 'location.state.isUnlock'));

    return (
      <Fragment>
        <WordPressHelmet
          title={title}
          seo={seo}
        />

        {(membersOnly && !isUnlock) && <MembersOnlyPrompt />}

        <Group type="white dotted" graphics={pattern} showLeftGraphics={false}>
          <Header transparent />

          <Hero wide>
            <Meta
              type={label}
              date={format(new Date(date), 'MMM D, YYYY')}
            />
            <Heading>{ReactHtmlParser(headerTitle || title)}</Heading>

            {copy && <Copy>{copy}</Copy>}
          </Hero>
        </Group>

        <Downloader
          title={title}
          image={coverImage}
          extension={type}
          size={size}
          href={file ? file.url : url}
        />

        {heroImage && heroImage.url && (
          <ImageCover
              isHero
              isCover={heroTreatment !== 'center' && heroTreatment !== 'aspect'}
              isCenter={heroTreatment === 'center'}
              isAspect={heroTreatment === 'aspect'}
              src={heroImage.url}
              alt={heroImage.alt}
            />
          )}
        <StickyNavBarWrapper id="top">
          <NavBar
            name={headerTitle || title}
            location={location.pathname}
            theme={assets(pattern)}
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
              {hasComponents && (
                <Slices
                  data={components}
                  isCenter
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

export default withRouter(Report);

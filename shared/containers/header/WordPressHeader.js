import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import Channels from 'containers/channels';
import { Group } from 'components/layout';
import Hero, { Meta, Heading, Label, Copy, Tags, Icon } from 'components/hero';
import { ImageCover } from 'components/slices';

import Header from './Header';

export default class WordPressHeader extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
    children: PropTypes.node,
    type: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string,
    ]),
    meta: PropTypes.shape({
      type: PropTypes.string,
      date: PropTypes.string,
    }),
    tags: PropTypes.node,
    wide: PropTypes.bool,
    showChannels: PropTypes.bool,
    backgroundImage: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    video: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    isInversed: PropTypes.bool,
  };

  static defaultProps = {
    title: '',
    data: {},
    wide: false,
    meta: {},
  }

  render() {
    const {
      data,
      title,
      children,
      type,
      meta,
      tags,
      wide,
      showChannels,
      backgroundImage,
      video,
      isInversed,
    } = this.props;

    const {
      alignment = '',
      label = '',
      title: headerTitle,
      groupType = 'white',
      copy = '',
      pattern = null,
      full = false,
      hero_image: heroImage = '',
      hero_image_treatment: heroTreatment = 'cover',
      icon = {},
      transparent_header: transparentHeader = true,
      small_header: smallHeader = false,
    } = data;

    const graphics = typeof pattern === 'string' ? pattern : undefined;
    const hasIcon = icon && icon.url;
    const hasMeta = meta && (meta.type || meta.date);

    const heroBackgroundImage = backgroundImage && backgroundImage.url ?
      backgroundImage.url : undefined;
    const heroVideo = video && video.url ? video.url : undefined;

    return (
      <Fragment>
        <Group type={groupType} graphics={graphics} leftAlign={alignment === 'left'}>
          <Header
            transparent={transparentHeader && !showChannels}
            type={type}
          />

          {showChannels && <Channels />}

          <Hero
            center={alignment === 'center'}
            full={full}
            wide={wide}
            backgroundImage={heroBackgroundImage}
            video={heroVideo}
            isInversed={isInversed}
            isSmallHeader={smallHeader}
          >
            {hasMeta && <Meta type={meta.type} date={meta.date} />}
            {hasIcon && <Icon src={icon.url} />}
            {label && <Label>{label}</Label>}
            <Heading>{ReactHtmlParser(headerTitle || title)}</Heading>
            {copy && <Copy>{copy}</Copy>}
            {tags && <Tags tags={tags.map(tag => tag.name)} />}
          </Hero>

          {children}
        </Group>

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
      </Fragment>
    );
  }
}

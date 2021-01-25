import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import ReactHtmlParser from 'react-html-parser';

function cleanTitle(title = '') {
  try {
    const parsedTitle = ReactHtmlParser(title);

    if (Array.isArray(parsedTitle) &&
        parsedTitle.length > 0 &&
        typeof parsedTitle[0] === 'string') {
      return parsedTitle[0];
    }
  } catch (e) {
    // nothing
  }

  return title;
}

export default class WordpressHelmet extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    seo: PropTypes.object,
  }

  static defaultProps = {
    title: undefined,
    seo: {},
  }

  render() {
    const { title } = this.props;

    const {
      title: seoTitle,
      description,
      canonical,
      noFollow,
      noIndex,
      opengraph = {},
      twitter = {},
    } = this.props.seo;

    const usedTitle = cleanTitle(seoTitle || title || undefined);

    const twitterTitle = twitter.title || usedTitle || undefined;
    const twitterDesc = twitter.description || description || undefined;
    const twitterImg = twitter.image || undefined;

    const fbTitle = opengraph.title || usedTitle || undefined;
    const fbDesc = opengraph.description || description || undefined;
    const fbImg = opengraph.image || undefined;

    const robots = noIndex || noFollow ?
      [noIndex ? 'noindex' : '', noFollow ? 'nofollow' : ''].filter(i => Boolean(i)).join(',') :
      undefined;

    const link = [
      canonical ? { rel: 'canonical', href: canonical } : null,
    ].filter(i => Boolean(i));

    const meta = [
      description ? { name: 'description', content: description } : null,
      twitterTitle ? { name: 'twitter:title', content: twitterTitle } : null,
      twitterDesc ? { name: 'twitter:description', content: twitterDesc } : null,
      twitterImg ? { name: 'twitter:image', content: twitterImg } : null,
      fbTitle ? { property: 'og:title', content: fbTitle } : null,
      fbDesc ? { property: 'og:description', content: fbDesc } : null,
      fbImg ? { property: 'og:image', content: fbImg } : null,
      robots ? { name: 'robots', content: robots } : null,
    ].filter(i => Boolean(i));

    return (
      <Helmet
        title={usedTitle}
        meta={meta}
        link={link}
      />
    );
  }
}

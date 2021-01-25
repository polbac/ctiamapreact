import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import Footer, { Subscribe, Contact } from 'components/footer';

import LogoWhite from 'assets/images/ctia-logo-w.svg';

import IconFacebook from 'assets/images/icons/socialicon-facebook-white.svg';
import IconTwitter from 'assets/images/icons/socialicon-twitter-white.svg';
import IconLinkedin from 'assets/images/icons/socialicon-linkedin-white.svg';
import IconGoogle from 'assets/images/icons/socialicon-googleplus-white.svg';
import IconYoutube from 'assets/images/icons/socialicon-youtube-white.svg';
import IconContact from 'assets/images/icons/icon-contact.svg';
import IconInstagram from 'assets/images/icons/socialicon-instagram-white.svg';

class FooterContainer extends Component {

  static propTypes = {
    jobResult: PropTypes.object,
  };

  static defaultProps = {
    jobResult: {},
  }

  render() {

    const {
      jobResult: {
        footer = {},
      } = {},
    } = this.props;

    const {
      slogan = '',
      address = '',
      phone = '',
      copyright = '',
      links = [],
      subscribe: {
        title: subscribeTitle = '',
        text: subscribeText = '',
        link: subscribeLink = '',
        link_text: subscribeLinkText = '',
      } = {},
      contact: {
        title: contactTitle = '',
        text: contactText = '',
        link: contactLink = '',
      } = {},
      social: {
        facebook = '',
        twitter = '',
        linkedin = '',
        youtube = '',
        googleplus = '',
        instagram = '',
      } = {},
    } = footer;

    const social = [
      { text: 'Facebook',
        icon: <IconFacebook />,
        link: facebook },
      { text: 'Twitter',
        icon: <IconTwitter />,
        link: twitter },
      { text: 'LinkedIn',
        icon: <IconLinkedin />,
        link: linkedin },
      { text: 'YouTube',
        icon: <IconYoutube />,
        link: youtube },
      { text: 'Google+',
        icon: <IconGoogle />,
        link: googleplus },
      { text: 'Instagram',
        icon: <IconInstagram />,
        link: instagram },
    ].filter(i => i.link !== '');

    return (
      <Footer
        logo={<LogoWhite />}
        slogan={slogan}
        address={address}
        phone={phone}
        copyright={copyright}
        links={links}
        subscribe={
          <Subscribe
            title={subscribeTitle}
            text={subscribeText}
            link={subscribeLink}
            buttonText={subscribeLinkText}
          />
        }
        contact={
          <Contact
            title={contactTitle}
            text={contactText}
            link={contactLink}
            icon={<IconContact />}
            social={social}
          />
        }
      />
    );
  }
}

const footerContainerWithJob = withJob({
  work: ({ wordpress }) => wordpress.global(),
  LoadingComponent: () => (
    <Footer />
  ),
  ErrorComponent: ({ error }) => { // eslint-disable-line
    console.error('Error rendering footer', error);
    return (
      <div />
    );
  },
})(FooterContainer);

export default inject('wordpress')(footerContainerWithJob);

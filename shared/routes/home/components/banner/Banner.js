import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { Textfit } from 'react-textfit';
import { Link } from 'react-router-dom';

import s from './Banner.scss';

export default class Banner extends PureComponent {

  static propTypes = {
    content: PropTypes.string,
    bannerUrl: PropTypes.string,
  }

  state = { isMobile: false, isVisible: false }

  componentDidMount() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      this.onResize();
    }, 50);

    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    this.setState({ isMobile: window.matchMedia('(max-width: 1080px)').matches });
  }

  showText = () => {
    setTimeout(() => {
      this.setState({ isVisible: true });
    }, 100);
  }

  render() {
    const { content, bannerUrl } = this.props;
    const { isMobile, isVisible } = this.state;
    // const isLink = (typeof bannerUrl !== 'undefined');
    const isLink = bannerUrl !== '' ? 1 : 0;
    const isExternal = isLink && /^((https?:)?\/\/|[0-9a-zA-Z]+:)/.test(bannerUrl);
    const wrapper = child => (<div className={s.banner}>
      <div className={s.banner__container}>
        <div className={s.banner__row}>
          <Textfit className={s(s.banner__content, { isVisible })} mode={isMobile ? 'multi' : 'single'} min={16} style={{ maxHeight: '100px' }} onReady={this.showText}>
            {child}
          </Textfit>
        </div>
      </div>
    </div>);

    if (isExternal) {
      return wrapper((<a target="_blank" rel="noopener noreferrer" href={bannerUrl}>
        {ReactHtmlParser(content)}
      </a>));
    }
    return (
      wrapper(isLink ?
        (<Link to={bannerUrl} >
          {ReactHtmlParser(content)}
        </Link>) :
        ReactHtmlParser(content))
    );
  }
}

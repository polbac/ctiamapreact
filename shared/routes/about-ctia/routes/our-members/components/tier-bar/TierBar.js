import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import scrollToElement from 'utils/scrollToElement';

import BackToTop from 'assets/images/icons/icon-backtotop.svg';

import s from './TierBar.scss';

export default class TierBar extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    tiers: PropTypes.object,
  }

  static defaultProps = {
    title: 'Our Members',
    tiers: {},
  }

  state = {
    isVisible: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }

  onScroll = () => {
    const scrollY = window.pageYOffset;

    if (this.currentY === undefined) {
      this.onResize();
    }

    this.setState({
      isVisible: scrollY > this.currentY,
    });
  }

  onResize = () => {
    this.currentY = this.el.parentNode.getBoundingClientRect().top + window.pageYOffset;
  }

  anchorLinks = () => {
    const { tiers } = this.props;

    const links = [];

    Object.entries(tiers).forEach(([key, value]) => {
      links.push(<a key={key} className={s.tierBar__link} href={`#group-${key}`}>{value}</a>);
    });

    return links;
  }

  render() {
    const { title } = this.props;
    const { isVisible } = this.state;

    return (
      <div className={s(s.tierBar, { isVisible })} ref={(el) => { this.el = el; }}>
        <div className={s.tierBar__inner}>
          <div className={s.tierBar__title}>{title}</div>
          <div className={s.tierBar__container}>
            <div className={s.tierBar__row}>
              <div className={s.tierBar__col}>
                <div className={s.tierBar__tier}>
                  {this.anchorLinks()}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => scrollToElement('#top')}
            className={s.tierBar__return}
            aria-label="scrolls to top"
          >
            <BackToTop className={s.tierBar__icon} />
          </button>
        </div>
      </div>
    );
  }
}

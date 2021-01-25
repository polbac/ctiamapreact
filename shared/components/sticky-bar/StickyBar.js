import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import scrollToElement from 'utils/scrollToElement';

import s from './StickyBar.scss';

export default class StickyBar extends PureComponent {

  static propTypes = {
    headings: PropTypes.array,
    withOffset: PropTypes.bool,
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

  render() {
    const { headings, withOffset } = this.props;
    const { isVisible } = this.state;
    const offset = withOffset ? '60%' : 0;

    return (
      <div className={s(s.bar, { isVisible })} ref={(el) => { this.el = el; }}>
        <div className={s.bar__inner}>
          <div className={s.bar__container}>
            <div className={s.bar__wrapper}>
              {headings.map((h, i) => (
                <button
                  className={s.bar__button}
                  onClick={() => scrollToElement(`#section-${i + 1}`, { offset })}
                  key={i}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

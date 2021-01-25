import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import s from './Hero.scss';

import SmallHeader from 'assets/images/small-header.svg';

export default class Hero extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    center: PropTypes.bool,
    wide: PropTypes.bool,
    full: PropTypes.bool,
    isLoading: PropTypes.bool,
    color: PropTypes.string,
    enableAnim: PropTypes.bool,
    backgroundImage: PropTypes.string,
    video: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    isInversed: PropTypes.bool,
    isSmallHeader: PropTypes.bool,
  }

  static defaultProps = {
    enableAnim: true,
  }

  render() {
    const {
      children,
      center,
      wide,
      full,
      isLoading,
      color,
      enableAnim,
      backgroundImage,
      video,
      isInversed,
      isSmallHeader,
    } = this.props;

    const rest = { center, full, isLoading, isInversed, color, enableAnim };
    const styles = { backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined };

    return (
      <section
        className={s(s.hero, { center, wide, full, isLoading, isSmallHeader })}
        style={styles}
      >
        {video && (
          <video // eslint-disable-line
            ref={(el) => { this.videoEl = el; }}
            src={video}
            className={s.hero__video}
            poster={get(backgroundImage, 'url')}
            muted
            loop
            playsInline
            autoPlay
          />
        )}

        <div className={s.hero__container}>
          <div className={s.hero__row}>
            <div className={s.hero__col}>
              {Children.map(children, (c) => {
                if (c) {
                  return cloneElement(c, { ...rest });
                }

                return null;
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

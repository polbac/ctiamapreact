import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Iframe.scss';

export default class Heading extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    src: PropTypes.string,
    height: PropTypes.string,
    isCenter: PropTypes.bool,
    isLoading: PropTypes.bool,
    isWide: PropTypes.bool,
  }

  static defaultProps = {
    title: 'iframe',
    height: '600',
  }

  render() {
    const { title, src, isCenter, isLoading, isWide, height } = this.props;

    return (
      <figure
        className={s(s.iframe, { isCenter, isLoading, isWide })}
      >
        <div className={s.iframe__container}>
          <div className={s.iframe__row}>
            <div className={s.iframe__col}>
              <iframe
                title={title}
                className={s.iframe__content}
                src={src}
                style={{ height: `${height}px` }}
              />
            </div>
          </div>
        </div>
      </figure>
    );
  }
}

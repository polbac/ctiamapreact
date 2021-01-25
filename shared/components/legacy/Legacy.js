import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import s from './Legacy.scss';

export default class Legacy extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    content: PropTypes.string,
    isCenter: PropTypes.bool,
  }

  static defaultProps = {
    children: undefined,
  }

  render() {
    const { children, content, isCenter } = this.props;

    return (
      <div className={s(s.legacy, { isCenter })}>
        <div className={s.legacy__container}>
          <div className={s.legacy__row}>
            <div className={s.legacy__col}>
              <div
                className={s.legacy__content}
                dangerouslySetInnerHTML={{ __html: content }} // eslint-disable-line
              />

              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

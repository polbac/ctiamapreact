import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Icon.scss';

export default class Icon extends PureComponent {

  static propTypes = {
    src: PropTypes.object,
  };

  render() {
    const { src } = this.props;

    return (
      <div className={s.icon}>
        <img className={s.icon__img} src={src} alt="" />
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Audio.scss';

export default class Audio extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    caption: PropTypes.string,
  }

  render() {
    const { title, link, caption } = this.props;

    return (
      <div className={s.audio}>
        <h3>{title}</h3>
        <p>{link}</p>
        <p>{caption}</p>
      </div>
    );
  }
}

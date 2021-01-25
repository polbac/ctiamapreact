import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Number } from 'components/assets';

import s from './Bubble.scss';

export default class Bubble extends PureComponent {

  static propTypes = {
    data: PropTypes.string,
    copy: PropTypes.string,
    image: PropTypes.string,
    index: PropTypes.number,
    bubbleRef: PropTypes.func,
    contentRef: PropTypes.func,
    altText: PropTypes.string,
  }

  render() {
    const { data, copy, image, index, bubbleRef, contentRef, altText } = this.props;

    return (
      <div className={s(s.bubble, `bubble-${index}`)} ref={bubbleRef}>
        <div className={s.bubble__wrapper} ref={contentRef}>
          <Number className={s.bubble__number} colors="green-blue">{data}</Number>
          <p className={s.bubble__copy}>{copy}</p>
          <img className={s.bubble__image} src={image} alt={altText} />
        </div>
      </div>
    );
  }
}

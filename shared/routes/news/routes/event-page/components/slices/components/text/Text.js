import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import convertToRouterLink from 'utils/convertToRouterLink';

import s from './Text.scss';

export default class Text extends PureComponent {

  static propTypes = {
    text: PropTypes.string,
    isCenter: PropTypes.bool,
  }

  render() {
    const { text, isCenter } = this.props;

    return (
      <div className={s.text}>
        <div className={s.text__container}>
          <div className={s(s.text__content, { isCenter })}>
            {ReactHtmlParser(text, { transform: convertToRouterLink })}
          </div>
        </div>
      </div>
    );
  }
}

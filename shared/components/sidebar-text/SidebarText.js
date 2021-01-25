import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import convertToRouterLink from 'utils/convertToRouterLink';

import s from './SidebarText.scss';

export default class SidebarText extends PureComponent {

  static propTypes = {
    text: PropTypes.string,
  }

  render() {
    const { text } = this.props;

    return (
      <Fragment>
        <div className={s.sidebarText}>
          <div className={s.sidebarText__content}>
            {ReactHtmlParser(text, { transform: convertToRouterLink })}
          </div>
        </div>
      </Fragment>
    );
  }
}

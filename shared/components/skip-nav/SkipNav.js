import React, { PureComponent, Fragment } from 'react';
import s from './SkipNav.scss';

export default class SkipNav extends PureComponent {

  render() {

    return (
      <Fragment>
        <a tabIndex="1" className={s.skipnav} href="#skipNavTo">Skip Navigation</a>
      </Fragment>
    );
  }

}

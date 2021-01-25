import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './OurMission.scss';

export default class OurMission extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    backgroundColor: PropTypes.string,
  }

  render() {
    const { children, backgroundColor } = this.props;

    return (
      <div className={s.mission} style={{ backgroundColor }}>
        <div className={s.mission__container}>
          <div className={s.mission__inner}>{children}</div>

          <img
            src={require('!file-loader!assets/images/standolone-graphics/home-standalone-right.svg')}
            className={s.mission__svg}
            alt=""
          />
        </div>
      </div>
    );
  }
}

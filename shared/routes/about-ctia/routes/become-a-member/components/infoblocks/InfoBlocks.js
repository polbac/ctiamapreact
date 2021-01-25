import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './InfoBlocks.scss';

export default class InfoBlocks extends PureComponent {

  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.infoBlocks}>
        <div className={s.infoBlocks__container}>
          <div className={s.infoBlocks__row}>
            {React.Children.map(children, c => (
              <div className={s.infoBlocks__col}>{c}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';

import s from './Divider.scss';

export default class Divider extends PureComponent {

  render() {
    return (
      <div className={s.divider}><hr /></div>
    );
  }
}

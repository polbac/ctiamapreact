import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from 'components/input';

import s from './Filters.scss';

export default class Filters extends PureComponent {

  static propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
    selected: PropTypes.array,
  }

  render() {
    const { data, onChange, selected } = this.props;

    return (
      <div className={s.filters}>
        <div className={s.filters__box}>
          {data.map(item => (
            <div
              className={s.filters__item}
              key={item.key}
            >
              <Checkbox
                name={item.key}
                label={item.key}
                onChange={onChange}
                isChecked={Boolean(selected.find(e => e === item.key))}
              />

              <p className={s.filters__number}>{item.count}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Number } from 'components/assets';

import s from './Statistics.scss';

export default class Statistics extends PureComponent {

  static propTypes = {
    data: PropTypes.array,
  }

  static defaultProps = {
    data: [],
  }

  render() {
    const { data } = this.props;

    return (
      <div className={s.statistics}>
        <div className={s.statistics__row}>
          {data.map(({ pipe, number, copy, footnote }, i) => (
            <div key={i} className={s.statistics__col}>
              <div key={i} className={s.statistics__block}>
                <div className={s.statistics__number}>
                  {pipe ? (<Number className={s.statistics__pipe}>{number}</Number>) : number}
                </div>

                <p className={s.statistics__copy}>{copy}<sup>{footnote}</sup></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/button';

import s from './Modal.scss';

export default class Modal extends PureComponent {

  static propTypes = {
    onCloseClick: PropTypes.func,
    chart: PropTypes.arrayOf(PropTypes.object),
    activeCountry: PropTypes.number,
  };

  state = {
    activeIndex: this.props.activeCountry,
  };

  changeCountry = (index) => {
    this.setState({
      activeIndex: index,
    });
  }

  render() {
    const { onCloseClick, chart } = this.props;
    const { activeIndex } = this.state;

    return (
      <div className={s.modal}>
        <div className={s.modal__bar}>
          {chart.map(({ name, flag }, i) => (
            <button
              className={s(s.modal__badge, { modal__badgeSelected: activeIndex === i })}
              onClick={() => this.changeCountry(i)}
              key={`c_button_${i}`}
              aria-label={name}
            >
              <img src={flag} className={s.modal__flag} alt={name} />
            </button>
          ))}
        </div>

        <div className={s.modal__content}>
          <h1 className={s.modal__headline}>{chart[activeIndex].name}</h1>
          <p className={s.modal__copy}>{chart[activeIndex].text}</p>
          <Button blue onClick={onCloseClick}>Close</Button>
        </div>
      </div>
    );
  }
}

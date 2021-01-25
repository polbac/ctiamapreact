import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// import 'react-dates/initialize';
// import { DateRangePicker } from 'react-dates';
// import 'react-dates/lib/css/_datepicker.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import s from './Dropdown.scss';

export default class DateRange extends PureComponent {

  static propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
  }

  state = {
    // isMobile: false,
    startDate: null,
    endDate: null,
    // focusedInput: null,
  }

  // componentDidMount() {
  //   this.onResize();
  //   window.addEventListener('resize', this.onResize);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.onResize);
  // }

  // onResize = () => {
  //   this.setState({
  //     isMobile: window.matchMedia('(max-width: 768px)').matches,
  //   });
  // }

  // onDatesChange = ({ startDate, endDate }) => {
  //   this.setState({ startDate, endDate });

  //   this.props.onChange({ startDate, endDate });
  // }

  handleChangeStart = (startDate) => {
    this.setState({ startDate });

    this.props.onChange({ startDate, endDate: this.state.endDate });
  }

  handleChangeEnd = (endDate) => {
    this.setState({ endDate });

    this.props.onChange({ startDate: this.state.startDate, endDate });
  }

  render() {
    const { label } = this.props;
    // const { isMobile } = this.state;

    return (
      <div className={s.dropdown}>
        <label // eslint-disable-line
          className={s.dropdown__label}
        >
          {label || 'Date'}
        </label>

        <div className={s(s.dropdown__select, s.isDate)}>

          { /*
          <DateRangePicker
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id"
            endDate={this.state.endDate}
            endDateId="your_unique_end_date_id"
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput })}
            hideKeyboardShortcutsPanel
            anchorDirection="right"
            noBorder
            showClearDates
            block
            displayFormat="MM/DD/YY"
            isOutsideRange={() => false}
            withPortal
            orientation={isMobile ? 'vertical' : 'horizontal'}
            withFullScreenPortal={isMobile}
          /> */
          }

          <DatePicker
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart}
            placeholderText="Start Date"
            withPortal
          />

          <div className="DateRangePickerInput_arrow DateRangePickerInput_arrow_1" aria-hidden="true" role="presentation">
            <svg className="DateRangePickerInput_arrow_svg DateRangePickerInput_arrow_svg_1" viewBox="0 0 1000 1000">
              <path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z" />
            </svg>
          </div>

          <DatePicker
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
            placeholderText="End Date"
            withPortal
            className="selectEndDate"
          />

        </div>
      </div>
    );
  }
}

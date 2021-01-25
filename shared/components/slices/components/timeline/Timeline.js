import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import s from './Timeline.scss';
import DataPoint from './DataPoint';
import TimelinePopup from './TimelinePopup';

export default class Timeline extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    instructions: PropTypes.string,
    json: PropTypes.string,
  }

  state = {
    activeDataPoint: false,
  }

  /* Handle click events & update the state to reference the current timeline datapoint */
  clickHandler = (e) => {
    const id = e.target.dataset.pointId;

    this.setState({
      // eslint-disable-next-line no-restricted-globals
      activeDataPoint: (typeof id !== 'undefined' && !isNaN(id) ? id : false),
    });

  }

  /* Activate mobile view for screen widths > 768px */
  activateOnMobile = () => {
    if (window.innerWidth < 768 && this.state.activeDataPoint === false) {
      // Auto-activate the first datapoint
      this.setState({
        activeDataPoint: 0,
      });
    }
  }

  /* When component is ready, add window listeners to activate mobile view */
  componentDidMount() {
    this.activateOnMobile();
    ['resize', 'orientationchange'].forEach((evt) => {
      window.addEventListener(evt, this.activateOnMobile);
    });
  }

  /* Clean up when this component is unmounted */
  componentWillUnmount() {
    ['resize', 'orientationchange'].forEach((evt) => {
      window.removeEventListener(evt, this.activateOnMobile);
    });
  }

  /* Format a timeline object's display date */
  formatDate(dateObj) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
  }

  /* Calculate previous & next data points (for the left & right controls) based on the state */
  nextDataPoint(adp, step, max) {

    if (adp === false) return 0;
    const p = parseInt(adp, 10) + step;

    if (p > max) return 0;

    if (p < 0) return max;

    return p;

  }

  /* Sanitize & up data for popup, based on state */
  popupData(adp, sortedData) {
    return {
      date: adp !== false ?
        sortedData[adp].Date :
        '',
      heading: adp !== false ?
        sortedData[adp].Heading :
        '',
      copy: adp !== false ?
        sortedData[adp].Copy :
        '',
      link: adp !== false ?
        sortedData[adp].Link :
        '',
      src: adp !== false ?
        sortedData[adp].src :
        '',
    };
  }

  /* Sort the timeline data by date */
  sortData(obj) {
    const arr = Object.keys(obj).map(i => obj[i]);

    // Convert 'Date' property to Date object
    arr.forEach((element) => {
      element.Date = new Date(element.Date);
    });

    // Sort!
    arr.sort((a, b) => {
      if (a.Date < b.Date) return -1;
      if (a.Date > b.Date) return 1;
      return 0;
    });

    return arr;
  }

  render() {
    // Validate JSON input
    const { json } = this.props;
    let data = '';
    let sortedData = null;

    try {
      data = JSON.parse(json);
      sortedData = this.sortData(data);
    } catch (e) {
      console.warn('Invalid Timeline JSON.'); // (${e.message})
      return null;
    }

    // Fetch the lowest & highest dates, to determine the date range
    const oldestYear = sortedData[0].Date.getFullYear();
    const newestYear = sortedData[sortedData.length - 1].Date.getFullYear();
    const oldest = sortedData[0].Date.getTime() / 1000;
    const newest = sortedData[sortedData.length - 1].Date.getTime() / 1000;
    const range = newest - oldest;

    sortedData.forEach((elem) => {
      // Add a new 'position' property for each timeline object
      // eslint-disable-next-line no-mixed-operators
      elem.Position = Math.round(((elem.Date.getTime() / 1000) - oldest) * 100 / range);
      // Formate the date
      elem.Date = this.formatDate(elem.Date);
    });

    const {
      title,
      description,
      instructions,
    } = this.props;

    return (
      <div className={s.timeline}>
        <div className={s.timeline__container}>
          <div className={s.timeline__row}>
            <div className={s.timeline__col}>
              {/* {title && (<h3 className={s.title}>{title}</h3>)} */}
              {description && (<h4 className={s.description}>{description}</h4>)}
              {instructions && (<div className={s.instructions}>{instructions}</div>)}
              <div className={s.innerWrapper}>
                <div className={s(s.navButtonWrapper, s.prev)}>
                  <button
                    className={s.navButton}
                    data-point-id={
                      this.nextDataPoint(this.state.activeDataPoint, -1, sortedData.length - 1)}
                    onClick={this.clickHandler}
                  >
                    <img
                      className={s.timeline__leftArrow}
                      src={require('!file-loader!assets/images/icons/arrow-black.svg')}
                      alt="Arrow left"
                    />
                  </button>
                </div>
                <div className={s.timelineTrack}>
                  <div className={s.innerTrackWrapper}>
                    <div className={s.track} />
                    {sortedData.map((obj, idx) => (
                      <DataPoint
                        key={idx}
                        id={idx}
                        isActive={parseInt(this.state.activeDataPoint, 10) === idx}
                        date={obj.Date}
                        heading={obj.Heading}
                        position={obj.Position}
                        click={this.clickHandler}
                      />
                    ))}
                    <div className={s.years}>
                      <div className={s.oldestYear}>{oldestYear}</div>
                      {newestYear > oldestYear && (
                        <div className={s.newestYear}>{newestYear}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={s(s.navButtonWrapper, s.next)}>
                  <button
                    className={s.navButton}
                    data-point-id={
                      this.nextDataPoint(this.state.activeDataPoint, 1, sortedData.length - 1)}
                    onClick={this.clickHandler}
                  >
                    <img
                      className={s.timeline__rightArrow}
                      src={require('!file-loader!assets/images/icons/arrow-black.svg')}
                      alt="Arrow right"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <TimelinePopup
            close={this.clickHandler}

            {...this.popupData(this.state.activeDataPoint, sortedData)}
          />
        </div>
      </div>
    );
  }
}

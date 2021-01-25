import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import Button from 'components/button';
import { parse, format } from 'date-fns';
import config from 'utils/config';

import s from './EventInfo.scss';

export default class EventInfo extends PureComponent {

  static propTypes = {
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    venue: PropTypes.string,
    address: PropTypes.string,

    // no buttons are false from WP
    buttons: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),

    // empty map is empty string from WP
    map: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }

  render() {
    const {
      startDate,
      endDate,
      venue,
      address,
      buttons,
      map,
    } = this.props;

    const f = 'MMM DD, YYYY';
    const t = 'h:mm a';

    const mapsKey = config('googleMapsApiKey');
    const markerStyle = 'size:mid';
    const markerLocation = map && `${map.lat},${map.lng}`;
    const mapSrc = `https://maps.googleapis.com/maps/api/staticmap?center=${markerLocation}&zoom=13&size=320x200&key=${mapsKey}&markers=${markerStyle}|${markerLocation}`;
    const style = { backgroundImage: `url(${mapSrc})` };

    return (
      <div>
        <div className={s.eventInfo}>
          <div className={s.eventInfo__container}>
            <div className={s.eventInfo__row}>
              <div className={s.eventInfo__block}>
                <div className={s.eventInfo__header}>
                  <h3 className={s.eventInfo__title}>Date</h3>
                </div>
                <div className={s.eventInfo__content}>
                  <div className={s.eventInfo__date}>
                    <span>{format(parse(startDate), f)}</span>
                    {endDate && (
                      <span> &mdash; {format(parse(endDate), f)}</span>
                    )}
                  </div>

                  {startDate && format(parse(startDate), t) !== '12:00 am' && (
                    <div className={s.eventInfo__time}>
                      <span>{format(parse(startDate), t)}</span>
                      {endDate && (
                        <span> &mdash; {format(parse(endDate), t)}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {(venue || address) && (
                <div className={s.eventInfo__block}>
                  <div className={s.eventInfo__header}>
                    <h3 className={s.eventInfo__title}>Location</h3>
                  </div>
                  <div className={s.eventInfo__content}>
                    <div className={s.eventInfo__name}>
                      {venue}
                    </div>
                    <div className={s.eventInfo__address}>
                      {ReactHtmlParser(address)}
                    </div>
                    {/* {map && (
                      <a
                        className={s.eventInfo__map}
                        style={style}
                        href={`https://www.google.is/maps/@${markerLocation},15`}
                      >
                        <img
                          src={mapSrc}
                          alt="map of venue"
                          className={s.eventInfo__img}
                        />
                      </a>
                    )} */}
                  </div>
                </div>
              )}

              {map && (
                <div className={s.eventInfo__block}>
                  <a
                    className={s.eventInfo__map}
                    style={style}
                    href={`https://www.google.is/maps/@${markerLocation},15`}
                  >
                    <img
                      src={mapSrc}
                      alt="map of venue"
                      className={s.eventInfo__img}
                    />
                  </a>
                </div>
              )}

              {buttons && (
                <div className={s.eventInfo__block}>
                  <div className={s.eventInfo__buttons}>
                    {buttons.map((button, i) => (
                      <div key={i} className={s.eventInfo__button}>
                        <Button to={button.url}>{button.label}</Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

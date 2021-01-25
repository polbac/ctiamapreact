import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import reactHtmlParser from 'react-html-parser';

import { Icon } from 'components/assets';

import s from './Guideline.scss';

export default class Guideline extends PureComponent {

  static propTypes = {
    heading: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    label: PropTypes.string,
    date: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.string,
  }

  render() {
    const { label, date, heading, type, size, to } = this.props;

    return (
      <Link className={s.guideline} to={to}>
        <div className={s.document__content}>
          <div className={s.document__header}>
            {label && (
              <p className={s.document__label}>{label}</p>
            )}
            <p className={s.document__date}>{date}</p>
          </div>

          <div className={s.document__details}>
            <h3 className={s.document__heading}>{reactHtmlParser(heading)}</h3>

            <div className={s.document__infos}>
              {type && [
                <Icon className={s.document__icon} type={type} />,
                <p className={s.document__type}>{type}</p>,
              ]}
              <p className={s.document__size}>{size}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}


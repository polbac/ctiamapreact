import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import _get from 'lodash/get';

import { WordPressImage } from 'components/image';

import s from './Report.scss';

export default class Report extends PureComponent {

  static propTypes = {
    image: WordPressImage.propTypes.image,
    heading: PropTypes.string,
    copy: PropTypes.string,
    className: PropTypes.string,
    to: PropTypes.string,
  }

  render() {
    const { image, heading, copy, className, to } = this.props;

    return (
      <Link className={s(s.report, className)} to={to}>
        <div className={s.report__row}>
          <div className={s.report__col}>
            <div className={s.report__left}>
              {image && image.url ? (
                <img
                  className={s.report__image}
                  src={_get(image, 'sizes.medium', image.url)}
                  alt={image.alt}
                />
              ) : (
                <div className={s.report__placeholder} />
              )}
            </div>

            <div className={s.report__right}>
              <h3 className={s.report__heading}>{ReactHtmlParser(heading)}</h3>
              <p className={s.report__copy}>{copy}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import s from './Document.scss';

export default class Document extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
  }

  render() {
    const { title, link } = this.props;

    return (
      <div className={s(s.document)}>
        <div className={s.document__container}>
          <div className={s.document__row}>
            <div className={s.document__col}>
              <div className={s.document}>
                <h3><a href={link}>{title}</a></h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

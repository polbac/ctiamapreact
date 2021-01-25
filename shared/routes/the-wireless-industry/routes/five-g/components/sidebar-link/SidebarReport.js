import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
// import { TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';

import Animator from 'components/animator';

import s from './SidebarReport.scss';

export default class SidebarReport extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    image: PropTypes.string,
  }

  render() {
    const { title, link, image } = this.props;

    return (
      <Fragment>
        <Animator>
          <div className={s.sidereport}>
            <div className={s.sidereport__container}>
              <div className={s.sidereport__content}>
                <div className={s.sidereport__card}>
                  <Link to={link}>
                    <div className={s.sidereport__map}>
                      <img className={s.sidereport__image} src={image} alt="Report Thumbnail" />
                    </div>
                  </Link>
                  <div className={s.sidereport__title}>{title}</div>
                </div>
              </div>
            </div>
          </div>
        </Animator>
      </Fragment>
    );
  }
}

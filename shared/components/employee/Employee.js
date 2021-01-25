import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { WordPressImage } from 'components/image';

import s from './Employee.scss';

export default class Employee extends PureComponent {

  static propTypes = {
    image: WordPressImage.propTypes.image,
    name: PropTypes.string,
    title: PropTypes.string,
    to: PropTypes.string,
    small: PropTypes.bool,
  }

  static defaultProps = {
    name: 'John Doe',
    title: 'Employee',
  }

  render() {
    const { image, name, title, to, small } = this.props;

    const firstName = name.split(' ')[0];

    return (
      <div className={s(s.employee, { small })}>
        {image && image.url ? (
          <div className={s.employee__image} style={{ backgroundImage: `url(${image.url})` }}>
            <img className={s.employee__img} src={image.url} alt={image.alt || name} />
          </div>
        ) : <div className={s.employee__image} /> }
        <h3 className={s.employee__name}>{name}</h3>
        <p className={s.employee__title}>{title}</p>
        {to && to !== '' ? (
          <Link to={to} className={s.employee__link}>{`See ${firstName}'s bio`}</Link>
        ) : null }
      </div>
    );
  }
}

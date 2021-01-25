import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import EmployeeBlock from 'components/employee';

import s from './Employees.scss';

export default class Employees extends PureComponent {

  static propTypes = {
    employees: PropTypes.array,
    isCenter: PropTypes.bool,
    isEven: PropTypes.bool,
    isWide: PropTypes.bool,
  }

  static defaultProps = {
    employees: [],
  }

  render() {
    const { employees, isCenter, isEven, isWide } = this.props;

    if (employees.length === 0) {
      return null;
    }

    return (
      <div className={s(s.employees, { isCenter, isEven, isWide })}>
        <div className={s.employees__container}>
          <div className={s.employees__row}>
            <div className={s.employees__col}>
              <div className={s.employees__grid}>
                {employees.map((employee) => {
                  const {
                    title: name = '',
                    slug = '',
                    fields: {
                      title: jobTitle = '',
                      link = false,
                      short_bio: bio = '',
                      portrait_image: portraitImage = null,
                    } = {},
                  } = employee;

                  const to = link && slug ? `/about-ctia/the-ctia-team/${slug}` : null;

                  return (
                    <EmployeeBlock
                      key={name}
                      name={name}
                      title={jobTitle}
                      description={bio}
                      image={portraitImage}
                      to={to}
                      small
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Reports, { Report } from '../../components/reports';

export default class ReportsContainer extends PureComponent {

  static propTypes = {
    data: PropTypes.array,
  }

  render() {
    const { data, ...props } = this.props;

    return (
      <Reports {...props}>
        {data.map((report) => {
          const key = `report-${report.id}`;
          const {
            title,
            slug = '',
            excerpt = '',
            fields: {
              document: {
                cover_image: coverImage = null,
              } = {},
            } = {},
          } = report;

          const url = `/news/${slug}`;

          return (
            <Report
              key={key}
              image={coverImage}
              heading={title}
              copy={excerpt}
              to={url}
            />
          );
        })}
      </Reports>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import { Dropdown } from 'components/filters';

class Categories extends Component {

  static propTypes = {
    jobResult: PropTypes.array,
    label: PropTypes.string,
  }

  static defaultProps = {
    label: 'Content Type',
  }

  render() {
    const { jobResult, ...rest } = this.props;
    const options = [
      { value: '', text: 'All' },
      ...jobResult.map(t => ({
        value: t.slug,
        text: t.name,
      })),
    ];

    return (
      <Dropdown options={options} {...rest} />
    );
  }
}

const contentTypeWithJob = withJob({
  work: ({ wordpress, include = [] }) => wordpress.getCategories({ include: include.join(',') }),
})(Categories);

export default inject('wordpress')(contentTypeWithJob);

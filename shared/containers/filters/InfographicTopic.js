import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import { Dropdown } from 'components/filters';

class InfographicTopic extends Component {

  static propTypes = {
    jobResult: PropTypes.array,
  }

  render() {
    const { jobResult, ...rest } = this.props;

    const options = [
      { value: '', text: 'All' },
      ...jobResult.map(t => ({
        value: t.id.toString(),
        text: t.name,
      })),
    ];
    return (
      <Dropdown label="Topic" options={options} {...rest} />
    );
  }
}

const topicWithJob = withJob({
  work: ({ wordpress, include }) => wordpress.getInfographicTags({ include }),
})(InfographicTopic);

export default inject('wordpress')(topicWithJob);

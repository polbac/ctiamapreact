import { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

class StateMapContainer extends Component {

  static propTypes = {
    children: PropTypes.func,
    jobResult: PropTypes.array,
  }

  render() {
    const { jobResult, children } = this.props;

    if (!jobResult) {
      return null;
    }

    return children(jobResult);
  }
}

const stateMapContainerWithJob = withJob({
  work: ({ stateMap }) => stateMap.getAllStates(),
})(StateMapContainer);

export default inject('stateMap')(stateMapContainerWithJob);

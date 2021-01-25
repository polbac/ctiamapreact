import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import isEmpty from 'lodash/isEmpty';

import LoadingPage from 'containers/loading-page';
import { WordPressHeader } from 'containers/header';
import GraphsContainer from 'containers/graphs';
import Layout, { Group } from 'components/layout';
import NotFound from 'routes/not-found';

class Graph extends Component {

  static propTypes = {
    jobResult: PropTypes.array,
  };

  static defaultProps = {
    jobResult: [],
  }

  render() {
    const {
      jobResult: [
        graphs = [],
        [page = {}] = [],
      ] = [],
    } = this.props;

    if (isEmpty(graphs)) {
      return (<Route component={NotFound} />);
    }

    const {
      fields: {
        header = {},
      } = {},
    } = page;

    const [{
      title = '',
    }] = graphs;

    header.title = title;

    return (
      <Layout>
        <WordPressHeader data={header} title={title} />

        <Group type="gray">
          <GraphsContainer graphs={graphs} wide />
        </Group>
      </Layout>
    );
  }
}

const graphWithJob = withJob({
  work: ({ wordpress, match }) => Promise.all([
    wordpress.getInfographics({ slug: match.params.slug }),
    wordpress.getPage({ slug: 'infographics-library' }),
  ]),
  LoadingComponent: () => <LoadingPage />,
  ErrorComponent: ({ error }) => { // eslint-disable-line
    console.error('Error rendering graphs', error);
    return (
      <div />
    );
  },
})(Graph);

export default inject('wordpress')(graphWithJob);

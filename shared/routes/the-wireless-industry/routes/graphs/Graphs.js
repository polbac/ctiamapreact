import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import { InfographicTopic } from 'containers/filters';
import { parse, createUrl } from 'utils/qs';
import LoadingPage from 'containers/loading-page';
import { WordPressHeader } from 'containers/header';
import GraphsContainer from 'containers/graphs';
import Layout, { Group } from 'components/layout';
import Filters, { Toggles, Toggle } from 'components/filters';

class Graphs extends Component {

  static propTypes = {
    jobResult: PropTypes.array,
    history: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  static defaultProps = {
    jobResult: [],
  }

  state = {
    grid: true,
  }

  componentDidMount() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  setGridView = () => {
    this.setState({
      grid: true,
    });
  }

  setCardView = () => {
    this.setState({
      grid: false,
    });
  }

  onTopicChange = ({ target: { value } }) => {
    const { match: { path }, history, location: { search } } = this.props;

    history.push(createUrl({ path, search, query: { topic: value } }));
  }

  onResize = () => {
    const mobile = window.matchMedia('(max-width: 1080px)').matches;

    this.setState({
      isMobile: mobile,
    });

    // Force grid view if viewed on a mobile device
    if (mobile) {
      this.setState({
        grid: true,
      });
    }
  }

  render() {
    const {
      jobResult: [page = {}] = [],
      location: { search },
    } = this.props;
    const query = parse(search);

    const tags = [];

    if (query.topic) {
      tags.push(query.topic);
    }

    const { grid, isMobile } = this.state;

    const {
      title = '',
      fields: {
        header = {},
      } = {},
    } = page;

    return (
      <Layout>
        <Helmet title={title} />
        <WordPressHeader data={header} title={title}>
          <Filters>
            <InfographicTopic
              defaultValue={query.topic}
              onChange={this.onTopicChange}
            />

            {!isMobile && (
              <Toggles>
                <Toggle title="Grid view" active={grid} click={this.setGridView} />
                <Toggle title="Card view" active={!grid} click={this.setCardView} />
              </Toggles>
            )}
          </Filters>
        </WordPressHeader>

        <Group type="gray">
          <GraphsContainer tags={tags} wide={!grid} />
        </Group>
      </Layout>
    );
  }
}

const graphsWithJob = withJob({
  work: ({ wordpress, location }) =>
    wordpress.getPageOrPreview({ slug: 'infographics-library', querystring: location.search }),
  LoadingComponent: () => <LoadingPage />,
  ErrorComponent: ({ error }) => { // eslint-disable-line
    console.error('Error rendering graphs', error);
    return (
      <div />
    );
  },
})(Graphs);

export default inject('wordpress')(graphsWithJob);

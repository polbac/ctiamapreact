import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import GraphBlock, { Graph } from 'components/graph-block';
import { Graphs as GraphsWrapper } from 'components/wrappers';
import { ButtonDropdown } from 'components/button';
import ShareButton from 'containers/share-button';

import DownloadSvg from 'assets/images/icons/actionicon-download-optim.svg';

import LoadingGraphs from './LoadingGraphs';

class Graphs extends Component {

  static propTypes = {
    jobResult: PropTypes.array,
    heading: PropTypes.string,
    wide: PropTypes.bool,
    viewMore: PropTypes.string,
    viewMoreText: PropTypes.string,
    onlyContent: PropTypes.bool,
  };

  static defaultProps = {
    jobResult: [],
    wide: false,
  }

  render() {
    const {
      heading,
      viewMore,
      viewMoreText,
      wide,
      onlyContent,
      jobResult: graphs = [],
    } = this.props;

    this.graphEl = [];

    const content = (
      graphs.length > 0 && graphs.map((graph, i) => {
        const {
          title: graphTitle,
          slug: key,
          fields: {
            definition = '',
            text = '',
            link = '',
            link_text: linkText = '',
          } = {},
        } = graph;

        return (
          <GraphBlock
            key={key || i}
            title={graphTitle}
            text={text}
            link={link}
            linkText={linkText}
            definition={definition}
            wide={wide}
            footer={[
              <ButtonDropdown
                key="download"
                icon={<DownloadSvg />}
                items={[
                  <button onClick={() => this.graphEl[i].saveAsPng()}>Download as PNG</button>,
                  <button onClick={() => this.graphEl[i].saveAsSvg()}>Download as SVG</button>,
                ]}
              />,
              <ShareButton key="share" />,
            ]}
          >
            <Graph
              ref={(el) => { this.graphEl[i] = el; }}
              definition={definition}
            />
          </GraphBlock>
        );
      })
    );

    if (onlyContent) {
      return content;
    }

    return (
      <GraphsWrapper heading={heading} viewMore={viewMore} viewMoreText={viewMoreText}>
        {content || (
          <p>No infographics found for this topic.</p>
        )}
      </GraphsWrapper>
    );
  }
}

const graphsWithJob = withJob({
  work: ({ wordpress, tags, graphs }) => {
    if (graphs && Array.isArray(graphs)) {
      return Promise.resolve(graphs);
    }

    return wordpress.getInfographics({ tags });
  },
  LoadingComponent: () => <LoadingGraphs />,
  ErrorComponent: ({ error }) => { // eslint-disable-line
    console.error('Error rendering graphs', error);
    return (
      <div />
    );
  },
  shouldWorkAgain: (prevProps, nextProps) =>
    prevProps.tags !== nextProps.tags,
})(Graphs);

export default inject('wordpress')(graphsWithJob);

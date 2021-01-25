import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import LoadingPage from 'containers/loading-page';
import { WordPressHeader, WordPressHelmet } from 'containers/header';
import Layout, { Group } from 'components/layout';

import Board, { Item } from './components/board';

class BoardOfDirectors extends PureComponent {

  static propTypes = {
    jobResult: PropTypes.array,
  };

  static defaultProps = {
    jobResult: [],
  }

  render() {
    const {
      jobResult: [page = {}] = [],
    } = this.props;

    const {
      title = '',
      fields: {
        header = {},
        boards = [],
      } = {},
      seo = {},
    } = page;

    return (
      <Layout>
        <WordPressHelmet title={title} seo={seo} />

        <WordPressHeader data={header} title={title} />

        <Group type="shadow">
          {boards.map((board, i) => {
            const key = `board-${board.title}-${i}`;

            return (
              <Board key={key} title={board.title}>
                {board.members.map((member, j) => {
                  const memberKey = `member-${member.title}-${j}`;

                  return (
                    <Item
                      key={memberKey}
                      position={member.position}
                      name={member.name}
                      title={member.title}
                      company={member.company}
                      link={member.link}
                    />
                  );
                })}
              </Board>
            );
          })}
        </Group>
      </Layout>
    );
  }
}

const boardOfDirectorsWithJob = withJob({
  work: ({ wordpress, location }) =>
    wordpress.getPageOrPreview({ slug: 'board-of-directors', querystring: location.search }),
  LoadingComponent: () => <LoadingPage />,
  ErrorComponent: ({ error }) => { // eslint-disable-line
    console.error('Error rendering team', error);
    return (
      <div />
    );
  },
})(BoardOfDirectors);

export default inject('wordpress')(boardOfDirectorsWithJob);

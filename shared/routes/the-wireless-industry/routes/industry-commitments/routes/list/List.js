import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import _get from 'lodash/get';

import LoadingPage from 'containers/loading-page';
import { WordPressHeader, WordPressHelmet } from 'containers/header';
import Layout, { Group } from 'components/layout';
import List, { Item } from 'components/list';

class IndustryCommitments extends Component {

  static propTypes = {
    jobResult: PropTypes.array,
    match: PropTypes.object,
  };

  static defaultProps = {
    jobResult: [],
  }

  render() {
    const {
      jobResult: [page = {}] = [],
      match,
    } = this.props;

    const {
      title: pageTitle = '',
      fields: {
        guidelines = [],
        header = {},
      } = {},
      seo = {},
    } = page;

    const hasGuidelines = guidelines && guidelines.length > 0;

    return (
      <Layout>
        <Group type="gray dotted">
          <WordPressHelmet title={pageTitle} seo={seo} />
          <WordPressHeader data={header} title={pageTitle} />

          {hasGuidelines && (
            <List>
              {guidelines
                .sort((a, b) => {
                  const aN = parseInt(_get(a, 'fields.guideline.number', 99), 10);
                  const bN = parseInt(_get(b, 'fields.guideline.number', 99), 10);

                  return aN - bN;
                })
                .map((item, i) => {
                // with fallbacks for mapping bug
                const {
                  id,
                  ID,
                  title = '',
                  post_title: postTitle = '',
                  slug = '',
                  fields: {
                    header: {
                      copy = '',
                    } = {},
                    guideline: {
                      image,
                      number,
                    } = {},
                  } = {},
                } = item;

                return (
                  <Item
                    key={id || ID || i}
                    number={parseInt(number, 10)}
                    pattern={_get(item, 'fields.header.pattern')}
                    title={title || postTitle}
                    image={image}
                    buttonText="Read"
                    buttonLink={`${match.path}/${slug}`}
                  >
                    {copy}
                  </Item>
                );
              })}
            </List>
          )}
        </Group>
      </Layout>
    );
  }
}

const industryCommitmentsWithJob = withJob({
  work: ({ wordpress, location }) =>
    wordpress.getPageOrPreview({ slug: 'industry-commitments', querystring: location.search }),
  LoadingComponent: () => <LoadingPage />,
  ErrorComponent: ({ error }) => { // eslint-disable-line
    console.error('Error rendering industry commitments', error);
    return (
      <div />
    );
  },
})(IndustryCommitments);

export default inject('wordpress')(industryCommitmentsWithJob);

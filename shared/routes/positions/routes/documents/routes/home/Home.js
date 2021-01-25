import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import { parse, createUrl } from 'utils/qs';
import { renderDocuments } from 'utils/renderProps';

import { WordPressHeader, WordPressHelmet } from 'containers/header';
import LoadingPage from 'containers/loading-page';
import { Categories } from 'containers/filters';
import { DocumentList } from 'containers/posts';
import Layout, { Group } from 'components/layout';
import Filters, { DateRange } from 'components/filters';
import { Documents as DocumentsWrapper } from 'components/wrappers';

class Documents extends Component {

  static propTypes = {
    jobResult: PropTypes.array,
    match: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
  }

  static defaultProps = {
    jobResult: [],
  }

  onCategoryChange = ({ target: { value } }) => {
    const { match: { path }, history, location: { search } } = this.props;

    history.push(createUrl({ path, search, query: { type: value } }));
  }

  onDateChange = ({ startDate, endDate }) => {
    const { match: { path }, history, location: { search } } = this.props;
    const query = {};
    const format = 'YYYY-MM-DD';

    if (startDate) {
      query.after = `${startDate.format(format)}T00:00:00.000Z`;
    } else {
      query.after = '';
    }

    if (endDate) {
      query.before = `${endDate.format(format)}T00:00:00.000Z`;
    } else {
      query.before = '';
    }

    history.push(createUrl({
      path,
      search,
      query,
    }));
  }

  render() {
    const {
      jobResult: [page = {}] = [],
      location: { search },
      match,
    } = this.props;

    const query = parse(search);

    const {
      title = '',
      fields: {
        header = {},
      } = {},
      seo = {},
    } = page;

    return (
      <Layout>
        <WordPressHelmet title={title} seo={seo} />

        <WordPressHeader data={header} title={title}>
          <Filters>
            <Categories
              defaultValue={query.type}
              label="Document type"
              include={['letter', 'testimony', 'federal-filing', 'state-filing']}
              onChange={this.onCategoryChange}
            />
            <DateRange
              onChange={this.onDateChange}
            />
          </Filters>
        </WordPressHeader>

        <Group type="gray" loZIndex>
          <DocumentsWrapper noWrapper>
            <DocumentList
              key={search}
              categories={[query.type]}
              before={query.before}
              after={query.after}
            >
              {documents => renderDocuments(documents, match.path)}
            </DocumentList>
          </DocumentsWrapper>
        </Group>
      </Layout>
    );
  }
}

const documentsWithJob = withJob({
  work: ({ wordpress, location }) =>
    wordpress.getPageOrPreview({ slug: 'documents', querystring: location.search }),
  LoadingComponent: () => <LoadingPage />,
  ErrorComponent: ({ error }) => { // eslint-disable-line
    console.error('Error rendering documents', error);
    return (
      <div />
    );
  },
})(Documents);

export default inject('wordpress')(documentsWithJob);

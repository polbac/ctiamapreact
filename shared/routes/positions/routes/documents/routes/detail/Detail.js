import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import isEmpty from 'lodash/isEmpty';
import { format } from 'date-fns';

import { renderDocuments } from 'utils/renderProps';

import LoadingPage from 'containers/loading-page';
import { WordPressHeader, WordPressHelmet } from 'containers/header';
import NotFound from 'routes/not-found';

import Layout, { Group } from 'components/layout';
import { Documents as DocumentsWrapper } from 'components/wrappers';
import { Text } from 'components/slices';
import Author from 'components/author';
import Downloader from 'components/downloader';
import PostSidebar from 'components/post-sidebar';
import FooterSlices from 'components/footer-slices';

import { mimeTypeToType, urlToType } from 'utils/wordpress';

class Detail extends PureComponent {

  static propTypes = {
    jobResult: PropTypes.object,
  };

  static defaultProps = {
    jobResult: {},
  }

  render() {
    const {
      jobResult: {
        items: [doc = {}] = [],
      },
    } = this.props;

    if (isEmpty(doc)) {
      return <Route component={NotFound} />;
    }

    const {
      title = '',
      categories = [],
      date = '',
      fields: {
        header = {},
        document: {
          size = '',
          description = '',
          link_to: {
            url = '',
            file: {
              mime_type: mimeType = '',
              url: fileUrl = '',
            } = {},
          } = {},
          cover_image: coverImage = {},
          related = [],
          related_header: relatedHeader = '',
        } = {},
        author = {},
        footer = [],
      } = {},
      seo = {},
    } = doc;

    const hasContent = description !== '' || author.name;
    const hasFooter = footer && footer.length > 0;

    const type = mimeTypeToType(mimeType) || urlToType(url);

    const meta = {
      type: categories.map(c => c.name).join(', '),
      date: format(new Date(date), 'MMM D, YYYY'),
    };

    return (
      <Layout>
        <WordPressHelmet title={title} seo={seo} />

        <WordPressHeader data={header} title={title} meta={meta} />

        <Downloader
          title={title}
          image={coverImage}
          extension={type}
          size={size}
          href={fileUrl || url}
        />

        <Group type="gray" isContent>
          {hasContent && (
            <Fragment>
              <PostSidebar>
                <Author
                  name={author.name}
                  title={author.title}
                  image={author.image}
                />
              </PostSidebar>

              <Text text={description} />
            </Fragment>
          )}
        </Group>

        {related && related.length > 0 && (
          <Group type="gray" isContent>
            <DocumentsWrapper
              heading={relatedHeader || 'More Legal Documents and Filings'}
              loadMore={this.onLoadMore}
              noWrapper
            >
              {renderDocuments(related, '/positions/documents')}
            </DocumentsWrapper>
          </Group>
        )}

        {hasFooter && (
          <Group graphics="positions">
            <FooterSlices data={footer} />
          </Group>
        )}
      </Layout>
    );
  }
}

const detailWithJob = withJob({
  work: ({ wordpress, match }) => wordpress.getDocuments({ slug: match.params.slug }),
  LoadingComponent: LoadingPage,
  ErrorComponent: ({ error }) => { // eslint-disable-line
    console.error('Error rendering detail', error);
    return (
      <div />
    );
  },
  shouldWorkAgain: (prevProps, nextProps) =>
    prevProps.match.params.slug !== nextProps.match.params.slug,
})(Detail);

export default inject('wordpress')(detailWithJob);

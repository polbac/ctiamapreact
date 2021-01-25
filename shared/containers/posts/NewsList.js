import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import Button from 'components/button';

import LoadingNewsList from './LoadingNewsList';

function getPostsCategories(contentType) {
  if (Array.isArray(contentType)) {
    return contentType;
  }

  return contentType ? [contentType] : [];
}

// before and after need to be in ISO8601 format (ex. 2018-01-01T00:00:00)
const getPosts = ({
  wordpress,
  contentType,
  topic,
  before,
  after,
  page,
  sticky,
  exclude,
  limit = 12,
}) => wordpress.getPosts({
  categories: getPostsCategories(contentType),
  tags: topic ? [topic] : [],
  before,
  after,
  page,
  sticky,
  exclude,
  limit,
});
const getFeaturedPosts = ({ featured, topic, ...props }) =>
  featured && topic ? getPosts({ ...props, topic, sticky: true }) : { items: [] };

class NewsList extends Component {

  static propTypes = {
    jobResult: PropTypes.array,
    children: PropTypes.func,
    layout: PropTypes.func,
    heading: PropTypes.func,
    button: PropTypes.func,
    featured: PropTypes.bool,
    headingText: PropTypes.string,
  }

  static defaultPropTypes = {
    topic: undefined,
    contentType: undefined,
    featured: false,
    button: null,
    headingText: 'Latest',
  }

  page = 1;

  constructor(props) {
    super(props);

    const { jobResult: [featured, posts] } = props;

    this.state = {
      featured: featured.items || [],
      posts: posts.items || [],
      hasMore: posts.totalPages > 1,
    };
  }

  onLoadMore = () => {
    this.page = this.page + 1;

    try {
      getPosts({ ...this.props, page: this.page }).then(({ items, totalPages }) => {
        this.setState({
          posts: [...this.state.posts, ...items],
          hasMore: this.page < totalPages,
        });
      });
    } catch (err) {
      console.warn('Unable to load more articles');
    }
  }

  render() {
    const {
      children,
      layout: Layout,
      heading: Heading,
      button: ButtonWrapper,
      featured,
      headingText,
    } = this.props;

    const { featured: featuredPosts, posts, hasMore } = this.state;

    const hasFeaturedPosts = featured && featuredPosts.length > 0;

    return (
      <Fragment>
        {hasFeaturedPosts && (
          <Fragment>
            <Heading>Featured Content</Heading>

            {Layout ? (
              <Layout>
                {children(featuredPosts)}
              </Layout>
            ) : children(featuredPosts)}
          </Fragment>
        )}

        {(Heading && (headingText || hasFeaturedPosts)) && (
          <Heading>{headingText || 'Latest News'}</Heading>
        )}

        {Layout ? (
          <Layout>
            {children(posts)}
          </Layout>
        ) : children(posts)}

        {hasMore && ButtonWrapper && (
          <ButtonWrapper>
            <Button onClick={this.onLoadMore}>Load More</Button>
          </ButtonWrapper>
        )}
      </Fragment>
    );
  }
}

const newsListWithJob = withJob({
  work: async (props) => {
    const featuredPosts = await getFeaturedPosts(props);
    const exclude = featuredPosts.items.map(p => p.id);
    const posts = await getPosts({ ...props, exclude });

    return [
      featuredPosts,
      posts,
    ];
  },
  LoadingComponent: () => <LoadingNewsList />,
})(NewsList);

export default inject('wordpress')(newsListWithJob);

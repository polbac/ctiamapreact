import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
// import LoadingNewsList from './LoadingNewsList';

import Slider from './Twi5gPostSlider';

const getPosts = ({
  wordpress,
  categories,
  tagSlugs = ['5G', 'This Week in 5G'],
  postType = 'post',
  limit = 10, // Client wants top 10 from any type
}) => wordpress.getPosts({
  categories,
  tagSlugs,
  postType,
  limit,
});

const getBlogPosts = ({ ...props }) =>
  getPosts({ ...props, categories: ['blog'] });

const getReports = ({ ...props }) =>
  getPosts({ ...props, categories: ['report'] });

// const getInfographicsPosts = ({ ...props }) =>
//   getPosts({ ...props, postType: 'infographics' });

class Twi5gPostCarousels extends Component {

  static propTypes = {
    jobResult: PropTypes.array,
    isWide: PropTypes.bool,
    postCategory: PropTypes.string,
    mobileViewInstructions: PropTypes.string,
  }

  render() {

    const {
      jobResult,
      postCategory,
      isWide,
      mobileViewInstructions,
    } = this.props;

    const [blogPosts, reports] = jobResult;

    return (
      <Fragment>
        { postCategory === 'blog' && blogPosts.items && blogPosts.items.length && (
          <Slider
            title="Blog Posts"
            type="Blog"
            slides={blogPosts.items}
            isWide={isWide}
            mobileViewInstructions={mobileViewInstructions}
          />
        )}
        { postCategory === 'report' && reports.items && reports.items.length && (
          <Slider
            title="Reports"
            type="Report"
            slides={reports.items}
            isWide={isWide}
            mobileViewInstructions={mobileViewInstructions}
          />
        )}
      </Fragment>
    );
  }
}

const postCarouselsWithJob = withJob({
  work: async (props) => {
    const blogPosts = await getBlogPosts({ ...props });
    const reports = await getReports({ ...props });
    // const infographics = await getInfographicsPosts({ ...props });

    return [
      blogPosts,
      reports,
      // infographics,
    ];
  },
  // LoadingComponent: () => <LoadingNewsList />,
})(Twi5gPostCarousels);

export default inject('wordpress')(postCarouselsWithJob);

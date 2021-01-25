import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _isArray from 'lodash/isArray';

import { Content as ContentWrapper } from 'components/wrappers';
import { News as NewsBlock } from 'components/blocks';

import { postType, dateParser } from 'utils/wordpress';
import resolver from 'utils/urlResolver';

export default class RelatedContentContainer extends PureComponent {

  static propTypes = {
    data: PropTypes.arrayOf(
      // this comes from WP
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        date: PropTypes.string,
        slug: PropTypes.string,
      }),
    ),
  }

  static defaultProps = {
    data: [],
  }

  render() {
    const { data } = this.props;

    if (!_isArray(data) || data.length === 0) {
      return null;
    }

    return (
      <ContentWrapper heading="Related Content">
        {data.map((item) => {
          const {
            id,
            date,
            type = 'page',
            categories: [{
                name: firstCategoryName = '',
              } = {},
            ] = [],
            slug,
            title,
            permalink,
            tags = [],
          } = item;

          const to = resolver({ slug, type });

          return (
            <NewsBlock
              key={id}
              type={postType(firstCategoryName || type)}
              date={type === 'page' ? undefined : dateParser(date)}
              heading={title}
              to={permalink || to}
              tags={tags.map(tag => tag.name)}
            />
          );
        })}
      </ContentWrapper>
    );
  }
}

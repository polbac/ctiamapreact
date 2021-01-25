import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _isArray from 'lodash/isArray';

import List, { Item } from 'components/list';

export default class Guidelines extends PureComponent {

  static propTypes = {
    heading: PropTypes.string,
    shadow: PropTypes.bool,
    segment: PropTypes.bool,
    data: PropTypes.arrayOf(
      // this comes from WP
      PropTypes.shape({
        ID: PropTypes.number,
        title: PropTypes.string,
        date: PropTypes.string,
        slug: PropTypes.string,
        categories: PropTypes.array,
        fields: PropTypes.object,
      }),
    ),
  }

  render() {
    const { heading, segment, data } = this.props;

    if (!_isArray(data) || data.length === 0) {
      return null;
    }

    return (
      <List
        heading={heading || 'More Guidelines'}
        segment={segment}
      >
        {data
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
              number={number}
              title={title || postTitle}
              image={image}
              buttonText="Read"
              buttonLink={`/the-wireless-industry/industry-commitments/${slug}`}
              shadow={this.props.shadow}
            >
              {copy}
            </Item>
          );
        })}
      </List>
    );
  }
}

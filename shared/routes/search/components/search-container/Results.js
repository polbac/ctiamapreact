import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { permalinkResolver } from 'utils/urlResolver';

import Button from 'components/button';
import { News as NewsBlock, Page as PageBlock } from 'components/blocks';
import { postType } from 'utils/wordpress';

import s from './Results.scss';

export default class Results extends PureComponent {

  static propTypes = {
    data: PropTypes.array,
    onClick: PropTypes.func,
    showLoadMore: PropTypes.bool,
  }

  render() {
    const { data, onClick, showLoadMore } = this.props;
    const noResult = data.length === 0;

    return (
      <div className={s.results}>
        <div className={s.results__grid}>
          {noResult && (
            <div className={s.results__noResult}>
              <h3 className={s.results__noResultHeading}>No result</h3>
              <p className={s.results__noResultCopy}>Submit a new query to the search.</p>
            </div>
          )}

          {data && data.map((item) => {
            if (item.post_type === 'page') {
              return (
                <PageBlock
                  key={item.post_id}
                  label={item.label}
                  heading={item.post_title}
                  copy={item.content}
                  to={permalinkResolver(item.permalink, item.post_type, item.permalink)}
                  hasIllustration
                />
              );
            }

            if (item.post_type === 'glossary') {
              return null;
            }

            const {
              post_id: id = '',
              post_date_formatted: date = '',
              post_title: title = '',
              post_type: type = '',
              permalink = '',
              taxonomies: {
                category: [
                  firstCategory = '',
                ] = [],
              } = {},
              _highlightResult: {
                taxonomies: {
                  post_tag: matchedTags = [],
                } = {},
              } = {},
            } = item;

            const tags = matchedTags
              .sort(a => a.matchLevel === 'full' ? 0 : 1) // sort by match level
              .reduce((arr, tag) => [...arr, tag.value], [])
              .map(tag => tag.replace(/<[^>]*>/gi, '')); // remove <em>

            return (
              <NewsBlock
                key={id}
                type={postType(firstCategory || type)}
                date={date}
                heading={title}
                to={permalinkResolver(permalink, type)}
                tags={tags}
              />
            );
          })}
        </div>

        {showLoadMore && (
          <Button
            className={s.results__button}
            onClick={onClick}
          >
            Load More
          </Button>
        )}
      </div>
    );
  }
}

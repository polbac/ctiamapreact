import React from 'react';
import { News as NewsBlock, Document as DocumentBlock } from 'components/blocks';
import { mimeTypeToType, urlToType, getPrimaryCategory } from 'utils/wordpress';
import _get from 'lodash/get';

/**
 * Shared render function for posts
 *
 * @param {array} posts - Posts to render
 */
export function renderPosts(posts, { showPremiumImage = true, blockLimit } = {}) {
  const results = posts.map(({
    id,
    categories = [],
    primaryCategory,
    date = '',
    title: postTitle,
    tags = [],
    slug,
    fields: {
      header: {
        members_only: membersOnly = false,
      } = {},
      author,
      premium_image: image,
      event: {
        start_date: startDate = '',
      } = {},
    } = {},
  }) => {
    const type = getPrimaryCategory(categories, primaryCategory);
    const direction = showPremiumImage && image && image.url ? 'horizontal' : undefined;
    const realDate = type.toLowerCase() === 'event' && startDate ? startDate : date;

    return (
      <NewsBlock
        key={`news-${id}`}
        type={type}
        date={realDate}
        heading={postTitle}
        image={showPremiumImage ? image : undefined}
        direction={direction}
        tags={tags.map(tag => tag.name)}
        to={`/news/${slug}`}
        author={author}
        membersOnly={membersOnly}
      />
    );
  });

  if (blockLimit > 0 && showPremiumImage) {
    const postLimit = posts.reduce((prev, curr) => {
      if (_get(curr, 'fields.premium_image', false)) {
        return prev - 1;
      }

      return prev;
    }, posts.length);

    return results.slice(0, postLimit);
  }

  return results;
}

export function renderDocuments(documents, baseurl = '') {
  return documents.map((item) => {
    const {
      title: documentTitle = '',
      id = '',
      slug = '',
      categories = [],
      date = '',
      fields: {
        document: {
          link_to: {
            url = '',
            file: {
              mime_type: mimeType = '',
            } = {},
          } = {},
          size = '',
        } = {},
      } = {},
    } = item;

    const documentLabel = categories.map(c => c.name).join(', ');
    const type = mimeTypeToType(mimeType) || urlToType(url);
    const to = `${baseurl}/${slug}`;

    return (
      <DocumentBlock
        key={id}
        label={documentLabel}
        date={date}
        heading={documentTitle}
        type={type}
        size={size}
        to={to}
      />
    );
  });
}

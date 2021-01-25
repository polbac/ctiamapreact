/* eslint-disable no-use-before-define */
import { URL } from 'url';
import isPlainObject from 'lodash/isPlainObject';

function formatType(post) {
  switch (post.post_type) {
    case 'infographics':
      return formatInfographic(post, true);
    case 'documents':
      return formatDocument(post, true);
    default:
      return formatPost(post, true);
  }
}

function linkEmbed(id, embedded = [], field = 'id') {
  const item = embedded.find(i => i[field] === id);

  return item;
}

function linkEmbedArray(ids, embedded = []) {
  return ids
    .map(id => linkEmbed(id, embedded))
    .filter(Boolean);
}

function linkAcfEmbed(field, key, embed, embedPost = {}) {
  // field is linkable or flexible_content
  if (Array.isArray(field) && field.length > 0) {
    return field.map((f) => {
      if (f.ID) {
        // field is a post object and is linkable
        // first check if it's in the embedPost thing
        const embeddedPost = embedPost[f.ID];

        if (embeddedPost) {
          const { categories = [], fields = [], tags = [], primary_category = null } = embeddedPost; // eslint-disable-line

          return formatPlainPost(f, categories, fields, tags, primary_category);
        }

        if (embed[key]) {
          const entry = embed[key].find(m => m.ID === f.ID) || {};

          return formatType({ ...f, ...entry, _embedded_acf: embed });
        }
        return f;
      } else if (isPlainObject(f)) {
        return linkAllAcfEmbed(f, embed, embedPost);
      }

      return f;
    });
  } else if (field && field.ID) { // field is linkable
    if (embed[key]) {
      const entry = embed[key].find(m => m.ID === field.ID) || {};

      return formatType({ ...field, ...entry });
    }
  } else if (isPlainObject(field)) {

    return Object.keys(field).reduce((f, objKey) =>
      ({ ...f, [objKey]: linkAcfEmbed(field[objKey], objKey, embed, embedPost) }), {});
  }

  return field;
}

// looks through all acf fields and matches them to embedded acf fields
// this allows us to use the relationship field and get all the fields
// of the linked item
function linkAllAcfEmbed(acf = {}, embed = {}, embedPost = {}, nested = false) {
  const linked = {};

  Object.keys(acf).forEach((key) => {
    try {
      if (nested) {
        linked[key] = acf[key];
      } else {
        linked[key] = linkAcfEmbed(acf[key], key, embed, embedPost);
      }
    } catch (err) {
      //
    }
  });

  return linked;
}

// If we're using the yoast seo plugin
function linkSeo(data = {}) {
  const {
    title,
    metadesc: description = '',
    focuskw: keyword = '',
    canonical = '',
    'meta-robots-nofollow': noFollow = '',
    'meta-robots-noindex': noIndex = '',
    'opengraph-title': opengraphTitle = '',
    'opengraph-description': opengraphDescription = '',
    'opengraph-image': opengraphImage = '',
    'twitter-title': twitterTitle = '',
    'twitter-description': twitterDescription = '',
    'twitter-image': twitterImage = '',
  } = data;

  return {
    title,
    description,
    keyword,
    canonical,
    noFollow: noFollow === '1',
    noIndex: noIndex === '1',
    opengraph: {
      title: opengraphTitle,
      description: opengraphDescription,
      image: opengraphImage,
    },
    twitter: {
      title: twitterTitle,
      description: twitterDescription,
      image: twitterImage,
    },
  };
}

function formatPage(data, nested = false) {
  const {
    id,
    slug,
    acf = {},
    yoast = {},
    _embedded_acf: acfEmbedded = {},
    _embedded_post: embeddedPost = {},
    title: { rendered: title = '' } = {},
    content: { rendered: content = '' } = {},
    excerpt: { rendered: excerpt = '' } = {},
  } = data;

  const fields = linkAllAcfEmbed(acf, acfEmbedded, embeddedPost, nested);
  const seo = linkSeo(yoast);

  return {
    id,
    title,
    content,
    fields,
    slug,
    excerpt,
    seo,
  };
}

function formatPost(data, nested = false) {
  const {
    id,
    slug,
    date,
    categories: categoryIds = [],
    category_terms: categoryTerms = [],
    tags: tagIds = [],
    type,
    acf = {},
    yoast = {},
    _embedded_acf: acfEmbedded = {},
    _embedded_post: embeddedPost = {},
    primary_category: primaryCategory = '',
    modified,
    title: { rendered: title = '' } = {},
    content: { rendered: content = '' } = {},
    excerpt: { rendered: excerpt = '' } = {},
    _embedded: {
      'wp:term': terms = [],
    } = {},
    // for embedded
    post_title: postTitle,
    post_name: postName,
    post_date: postDate,
    post_type: postType,
    ID: postId,
    post_content: postContent,
  } = data;

  const flattenedTerms = terms.reduce((a, b) => a.concat(b), []);
  const flattenedCatTerms = categoryTerms.reduce((a, b) => a.concat(b), []);
  const tags = linkEmbedArray(tagIds, flattenedTerms);
  const categories = linkEmbedArray(categoryIds, flattenedTerms).length > 0 ?
    linkEmbedArray(categoryIds, flattenedTerms) :
    linkEmbedArray(categoryIds, flattenedCatTerms);
  const fields = linkAllAcfEmbed(acf, acfEmbedded, embeddedPost, nested);
  const seo = linkSeo(yoast);

  return {
    id: id || postId,
    title: title || postTitle,
    date: date || postDate,
    tags,
    categories,
    content: content || postContent,
    fields,
    modified,
    slug: slug || postName,
    excerpt,
    seo,
    primaryCategory,
    type: type || postType,
  };
}

function formatMenuItem(data) {
  const {
    ID: id = '',
    title = '',
    object: type = '',
    url = '',
    menu_order: order = -1,
  } = data;

  let slug = '';

  try {
    const itemUrl = new URL(url);

    slug = itemUrl.pathname;
  } catch (e) {
    // do nothing
  }

  return {
    id,
    title,
    type,
    url,
    slug,
    order,
  };
}

function formatMenus(data) {
  const {
    id = '',
    name = '',
    items = [],
  } = data;

  return {
    id,
    name,
    items: items.map(i => formatMenuItem(i)),
  };
}

function formatTeamMember(data) {
  const {
    id,
    slug,
    acf = {},
    _embedded_acf: acfEmbedded = {},
    title: { rendered: title = '' } = {},
    content: { rendered: content = '' } = {},
    excerpt: { rendered: excerpt = '' } = {},
  } = data;

  const fields = linkAllAcfEmbed(acf, acfEmbedded);

  return {
    id,
    title,
    content,
    fields,
    slug,
    excerpt,
  };
}

function formatInfographic(data, nested = false) {
  const {
    id,
    ID: postId,
    slug,
    acf = {},
    _embedded_acf: acfEmbedded = {},
    _embedded_post: embeddedPost = {},
    title: { rendered: title = '' } = {},
    content: { rendered: content = '' } = {},
    excerpt: { rendered: excerpt = '' } = {},
    post_title: postTitle,
    post_content: postContent,
    tags: tagIds = [],
    type,
    _embedded: {
      'wp:term': terms = [],
    } = {},
    post_type: postType,
  } = data;

  const flattenedTerms = terms.reduce((a, b) => a.concat(b), []);
  const tags = linkEmbedArray(tagIds, flattenedTerms);
  const fields = linkAllAcfEmbed(acf, acfEmbedded, embeddedPost, nested);

  return {
    id: id || postId,
    title: title || postTitle,
    content: content || postContent,
    fields,
    tags,
    slug,
    excerpt,
    type: type || postType,
  };
}

function formatDocument(data, nested) {
  const {
    id,
    ID: postId,
    slug,
    type,
    date,
    categories: categoryIds = [],
    tags: tagIds = [],
    acf = {},
    yoast = {},
    _embedded_acf: acfEmbedded = {},
    _embedded_post: embeddedPost = {},
    primary_category: primaryCategory = '',
    title: { rendered: title } = {},
    content: { rendered: content = '' } = {},
    excerpt: { rendered: excerpt = '' } = {},
    _embedded: {
      'wp:term': terms = [],
    } = {},
    post_title: postTitle,
    post_name: postName,
    post_type: postType,
    post_content: postContent,
  } = data;

  const flattenedTerms = terms.reduce((a, b) => a.concat(b), []);
  const tags = linkEmbedArray(tagIds, flattenedTerms);
  const categories = linkEmbedArray(categoryIds, flattenedTerms);
  const fields = linkAllAcfEmbed(acf, acfEmbedded, embeddedPost, nested);
  const seo = linkSeo(yoast);

  return {
    id: id || postId,
    title: title || postTitle,
    content: content || postContent,
    date,
    tags,
    categories,
    fields,
    slug: slug || postName,
    excerpt,
    seo,
    primaryCategory,
    type: type || postType,
  };
}

function formatPlainPost(data, categories, fields, tags, primaryCategory = undefined) {
  const {
    id,
    ID: postId,
    slug,
    type,
    date,
    yoast = {},
    title: { rendered: title } = {},
    content: { rendered: content = '' } = {},
    excerpt: { rendered: excerpt = '' } = {},
    post_title: postTitle,
    post_name: postName,
    post_date: postDate,
    post_type: postType,
    post_content: postContent,
  } = data;

  const seo = linkSeo(yoast);

  return {
    id: id || postId,
    title: title || postTitle,
    content: content || postContent,
    date: date || postDate,
    categories: categories || [],
    primaryCategory,
    type: type || postType,
    tags: tags || [],
    fields: fields || [],
    slug: slug || postName,
    excerpt,
    seo,
  };
}

function formatTags(data) {
  const {
    id,
    count,
    name,
    slug,
  } = data;

  return {
    id,
    count,
    name,
    slug,
  };
}

export {
  formatPage,
  formatPost,
  formatMenus,
  formatTeamMember,
  formatInfographic,
  formatDocument,
  formatTags,
};

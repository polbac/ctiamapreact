import { join } from 'path';
import urlPackage from 'url';
import config from 'utils/config';
import isEmpty from 'lodash/isEmpty';

const categories = [
  {
    label: 'The Wireless Industry',
    slug: 'the-wireless-industry',
  },
  {
    label: 'Positions',
    slug: 'positions',
  },
  {
    label: 'Consumer Resources',
    slug: 'consumer-resources',
  },
  {
    label: 'News',
    slug: 'news',
  },
  {
    label: 'About CTIA',
    slug: 'about-ctia',
  },
];

function blogResolver(slug) {
  return join('/news', slug);
}

function pageResolver(slug, parentSlug) {
  if (slug && !parentSlug) {
    const split = slug.split('/');
    const realSlug = split.pop();

    return join('/', ...split, realSlug);
  }

  return join('/', parentSlug, slug);
}

function customResolver(url = '/') {
  return url;
}

function resolver({ type = '', slug, parentSlug, url }) {
  // console.log(type, slug, parentSlug, url);

  switch (type.toLowerCase()) {
    // see types in ./wordpress.js
    case 'blog':
    case 'post':
    case 'press-release':
    case 'press_release':
    case 'press release':
    case 'statement':
    case 'report':
    case 'event':
      return blogResolver(slug);

    case 'page': {
      if (isEmpty(slug)) {
        return pageResolver(url);
      }

      return pageResolver(slug, parentSlug);
    }

    case 'custom':
      return customResolver(url);

    case 'document':
    case 'documents':
      return `/positions/documents/${slug}`;

    case 'guideline':
    case 'guidelines': {
      const split = slug.split('/').filter(x => x !== '');

      return `/the-wireless-industry/industry-commitments/${split[split.length - 1]}`;
    }

    default:
      return '/';
  }
}

function permalinkResolver(url, type) {
  const { path } = urlPackage.parse(url);
  const split = path.split('/').filter(x => x !== '');
  const slug = split.pop();
  const parentSlug = split.join('/');

  return resolver({ type, slug, parentSlug, url: path });
}

function objectResolver(obj, parentSlug = '') {
  const { type, slug, url } = obj;

  return resolver({ type, slug, parentSlug, url });
}

// function documentResolver(slug, cats = []) {
//   const findCategory = (_, category) => category.slug;

//   const type = cats.reduceRight(findCategory, 'document');

//   return resolver({ type, slug });
// }

function documentResolver(slug, type) {
  return resolver({ type, slug });
}

const createCanonicalUrl = (type, slug) => `${config('baseUrl')}${resolver({ type, slug })}`;

export default resolver;
export {
  categories,
  objectResolver,
  blogResolver,
  pageResolver,
  customResolver,
  permalinkResolver,
  documentResolver,
  createCanonicalUrl,
};

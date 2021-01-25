import { extendObservable } from 'mobx';
import _get from 'lodash/get';
import _uniqBy from 'lodash/uniqBy';

import apiUrl from 'utils/localApiUrl';
import { stringify, parse } from 'utils/qs';

export default class Wordpress {

  constructor({ wordpress = {} }, network) {
    this.fetch = network.fetch;
    extendObservable(this, wordpress);
  }

  getPage({ slug = '' } = {}) {
    const split = slug.split('/').reverse();
    const endpoint = `/wordpress/pages/${split.length > 0 ? split[0] : slug}`;
    const url = `${apiUrl}${endpoint}`;

    return this.fetch(url, { cacheKey: endpoint })
      .then(results => results)
      .catch((err) => {
        console.warn('Error fetching wordpress page. Slug = %s.', slug, err.message, err.stack);
        return [];
      });
  }

  getTeamMember({ slug = '' } = {}) {
    const url = `${apiUrl}/wordpress/team_members/${slug}`;

    return this.fetch(url)
      .then(results => results)
      .catch((err) => {
        console.warn('Error fetching wordpress team members. Slug = %s.', slug, err.message, err.stack);
        return [];
      });
  }

  getInfographics({ slug = '', tags = [] } = {}) {
    const qs = stringify({ tags: tags.join(',') });

    const endpoint = `/wordpress/infographics/${slug}${qs}`;
    const url = `${apiUrl}${endpoint}`;

    return this.fetch(url, { cacheKey: endpoint })
      .then(results => results)
      .catch((err) => {
        console.warn('Error fetching wordpress infographics. Slug = %s.', slug, err.message, err.stack);
        return [];
      });
  }

  getDocuments({ slug = '', categories = [], ...rest } = {}) {
    const qs = stringify({
      categories: categories.join(','),
      ...rest,
    });
    const url = `${apiUrl}/wordpress/documents/${slug}${qs}`;

    return this.fetch(url)
      .then(results => results)
      .catch((err) => {
        console.warn('Error fetching wordpress documents. Slug = %s', slug, err.message, err.stack);
        return [];
      });
  }

  getGuidelines({ slug = '' } = {}) {
    const url = `${apiUrl}/wordpress/guidelines/${slug}`;

    return this.fetch(url)
      .then(results => results)
      .catch((err) => {
        console.warn('Error fetching wordpress guidelines. Slug = %s', slug, err.message, err.stack);
        return [];
      });
  }

  async getPosts({ slug = '', categories = [], tags = [], exclude = [], ...rest } = {}) {
    const filters = {
      categories: categories.join(','),
      tags: tags.join(','),
      exclude: exclude.join(','),
      ...rest,
    };

    // special case ordering if we're only querying for events
    if (categories.length === 1 && categories[0] === 'event') {
      filters.orderBy = 'event.start_date';
    }

    // special case when tag slugs are included
    if (filters.tagSlugs) {

      const tagObjects = await this.getTags({ include: [filters.tagSlugs] });

      filters.tags = `${tagObjects.map(tag => tag.id).join(',')}`;
      delete filters.tagSlugs;
    }

    const qs = stringify(filters);

    const endpoint = filters.postType && filters.postType !== 'post' ?
      `/wordpress/${filters.postType}` :
      `/wordpress/posts/${slug}${qs}`;
    const url = `${apiUrl}${endpoint}`;

    return this.fetch(url, { cacheKey: endpoint })
      .then((results) => {
        if (filters.postType && filters.postType !== 'post') {
          return { items: filters.limit ? results.splice(0, filters.limit) : results };
        } else if (results.items && results.items.length > 0) {
          return results;
        }
        return { items: [] };
      })
      .catch((err) => {
        console.warn('Error fetching wordpress posts. Url = %s.', url, err.message, err.stack);
        return { items: [] };
      });
  }

  menus() {
    const endPoint = '/wordpress/menus/';
    const url = `${apiUrl}${endPoint}`;

    return this.fetch(url, { cacheKey: endPoint })
      .then(results => results)
      .catch((err) => {
        console.warn('Error fetching wordpress menus. Url = %s.', url, err.message, err.stack);
        return [];
      });
  }

  global() {
    const endPoint = '/wordpress/global/';
    const url = `${apiUrl}${endPoint}`;

    return this.fetch(url, { cacheKey: endPoint })
      .then(results => results)
      .catch((err) => {
        console.warn('Error fetching wordpress globals. Url = %s.', url, err.message, err.stack);
        return {};
      });
  }

  async getHomepage() {
    const [[home], newsData, reportsData] = await Promise.all([
      this.getPage({ slug: 'Homepage' }),
      this.getPosts({ categories: ['blog', 'event', 'press-release'], limit: 6 }),
      this.getPosts({ categories: ['report'], limit: 4 }),
    ]);

    const newsRaw = _get(home, 'fields.latest_news.news');
    const newsFixed = !newsRaw || newsRaw === '' ? [] : newsRaw;

    const news = _uniqBy(
      newsFixed.concat(newsData.items),
      'id',
    );

    const reportsRaw = _get(home, 'fields.latest_news.reports');
    const reportsFixed = !reportsRaw || reportsRaw === '' ? [] : reportsRaw;

    const reports = _uniqBy(
      reportsFixed.concat(reportsData.items),
      'id',
    );

    return [home, news, reports];
  }

  getTags({ include = [] }) {
    const endpoint = `/wordpress/tags${stringify({ slug: include.join(',') })}`;
    const url = `${apiUrl}${endpoint}`;

    return this.fetch(url, { cacheKey: endpoint })
      .then((response) => { // eslint-disable-line
        return response.map(item => ({
          ...item,
          name: item.name.replace('&amp;', '&'),
        }));
      })
      .catch((err) => {
        console.warn('Error fetching wordpress data', err.message, err.stack);
        return [];
      });
  }

  getInfographicTags({ include = [] }) {
    const endpoint = `/wordpress/infographic-tags${stringify({ slug: include.join(',') })}`;
    const url = `${apiUrl}${endpoint}`;

    return this.fetch(url, { cacheKey: endpoint })
      .then((response) => { // eslint-disable-line
        return response.map(item => ({
          ...item,
          name: item.name.replace('&amp;', '&'),
        }));
      })
      .catch((err) => {
        console.warn('Error fetching wordpress data', err.message, err.stack);
        return [];
      });
  }

  getCategories({ include }) {
    const endpoint = `/wordpress/categories${stringify({ include })}`;
    const url = `${apiUrl}${endpoint}`;

    return this.fetch(url, { cacheKey: endpoint })
      .catch((err) => {
        console.warn('Error fetching wordpress data', err.message, err.stack);
        return [];
      });
  }

  getPreview({ type, slug, id }) {
    const endPoint = `/wordpress/preview/?id=${id}&type=${type}&slug=${slug}`;
    const url = `${apiUrl}${endPoint}`;

    return this.fetch(url, { force: true })
      .then((results) => {
        if (type === 'post') {
          if (results.items && results.items.length > 0) {
            return results;
          }
          return { items: [results] };
        }

        return results;
      })
      .catch((err) => {
        console.warn('Error fetching wordpress data', err.message, err.stack);

        if (type === 'post') {
          return { items: [] };
        }

        return [];
      });
  }

  getPageOrPreview({ slug = '', querystring = '' } = {}) {
    const parsed = parse(querystring);

    if (parsed && parsed.id && parsed.preview) {
      return this.getPreview({ type: 'page', id: parsed.id });
    }

    return this.getPage({ slug });
  }
}

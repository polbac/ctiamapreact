import express from 'express';
import axios from 'axios';
import request from 'request';
import config from '../../config';
import { resolveUrl, catchErrors, logError } from './utils';

import {
  formatPage,
  formatPost,
  formatMenus,
  formatTeamMember,
  formatInfographic,
  formatTags,
  formatDocument,
} from './formatters';

const app = express();

const endpoint = config('wordpressApiUrl');
const customEndpoint = config('wordpressCustomApiUrl');
const previewCredentials = config('wordpressPreviewCredentials');
const uploads = config('wordpressUploadsUrl');

const fetch = axios.create();

const defaultOrder = 'desc';
const defaultOrderBy = 'date';

function resolve(input, filter = {}, base = endpoint) {
  return resolveUrl(input, filter, base);
}

function resolveCustom(url, filter = {}) {
  return resolve(url, filter, customEndpoint);
}

// mem cache for displaying categories and converting slugs to ids
let cachedCategories = {};

async function fetchCategories() {
  if (Object.keys(cachedCategories).length > 0) {
    return cachedCategories;
  }

  const filters = {
    per_page: 100,
    order: 'desc',
    orderby: 'count',
    hide_empty: 'true',
  };
  const url = resolve('categories', filters);
  const { data } = await fetch(url);
  const categories = data.map(t => formatTags(t));

  cachedCategories = categories;
  return cachedCategories;
}

async function wordpressCategoriesToIds(categoriesString = '') {
  const categories = await fetchCategories();
  const cats = categoriesString.toLowerCase().split(',');
  const result = cats.reduce((arr, s) => {
    const cat = categories.find(c => c.slug === s);

    if (cat) {
      return [...arr, cat.id];
    }

    // if categories are passed in as numbers, allow those
    if (!Number.isNaN(Number(s))) {
      return [...arr, Number(s)];
    }

    return arr;
  }, []);

  return result;
}

/* middleware */

async function pagesRoute(req, res) {
  const { slug } = req.params;

  const url = resolve('pages', { slug, _embed: true });

  try {
    const { data } = await fetch(url);
    const response = data.map(p => formatPage(p));

    res.send(response);
  } catch (err) {
    logError('Error fetching pages', err, { url });
    res.status(500).send([]);
  }
}

async function postsRoute(req, res) {
  const { slug } = req.params;
  const { categories, limit, orderBy, ...rest } = req.query;

  const filters = {
    _embed: true,
    slug,
    order: defaultOrder,
    orderby: orderBy || defaultOrderBy,
    per_page: limit,
    ...rest,
  };

  if (categories) {
    const categoriesAsIds = await wordpressCategoriesToIds(categories);

    if (categoriesAsIds.length > 0) {
      filters.categories = categoriesAsIds.join(',');
    }
  }

  const url = resolve('posts', filters);

  try {
    const { data, headers } = await fetch(url);
    const items = data.map(p => formatPost(p));

    res.send({
      total: headers['x-wp-total'],
      totalPages: headers['x-wp-totalpages'],
      items,
    });
  } catch (err) {
    logError('Error fetching posts', err, { url });
    res.status(500).send([]);
  }
}

async function menusRoute(req, res) {
  const url = resolveCustom('menus');

  try {
    const { data } = await fetch(url);

    if (!Array.isArray(data)) {
      logError('Menu data should be an array', undefined, { url });
      return res.status(500).send([]);
    }

    const response = data.map(p => formatMenus(p));

    res.send(response);
  } catch (err) {
    logError('Error fetching menus', err, { url });
    res.status(500).send([]);
  }
}

async function globalRoute(req, res) {
  const url = resolve('acf/options');

  try {
    const { data } = await fetch(url);

    res.send(data);
  } catch (err) {
    logError('Error fetching globals', { url, err });
    res.status(500).send([]);
  }
}

async function teamMembersRoute(req, res) {
  const { slug } = req.params;
  const filters = { _embed: true, order: defaultOrder, orderby: defaultOrderBy };

  if (slug) {
    filters.slug = slug;
  }

  const url = resolve('team_member', filters);

  try {
    const { data } = await fetch(url);

    const response = data.map(p => formatTeamMember(p));

    res.send(response);
  } catch (err) {
    logError('Error fetching team members', err, { url });
    res.status(500).send([]);
  }
}

async function infographicsRoute(req, res) {
  const { slug } = req.params;
  const { tags } = req.query;
  const filters = { _embed: true, order: defaultOrder, orderby: defaultOrderBy, per_page: 100 };

  if (slug) {
    filters.slug = slug;
  }

  if (tags) {
    filters.tags = tags;
  }

  const url = resolve('infographics', filters);

  try {
    const { data } = await fetch(url);

    const response = data.map(p => formatInfographic(p));

    res.send(response);
  } catch (err) {
    logError('Error fetching infographics', err, { url });
    res.status(500).send([]);
  }
}

async function modularComponentsRoute(req, res) {
  // const { slug, splat } = req.params;
  const slug = req.params[0];
  const url = uploads + slug;

  request(url).pipe(res);

  // try {
  //   const { data } = await fetch(url, { responseType: 'blob' });

  //   console.log(data);
  //   // const response = data.map(p => formatInfographic(p));

  //   res.send(data);
  // } catch (err) {
  //   logError('Error fetching modular components', err, { url });
  //   res.status(500).send([]);
  // }


}

async function documentsRoute(req, res) {
  const { slug } = req.params;
  const { categories, limit, ...rest } = req.query;
  const filters = {
    _embed: true,
    order: defaultOrder,
    orderby: defaultOrderBy,
    slug,
    per_page: limit,
    ...rest,
  };

  if (categories) {
    const categoriesAsIds = await wordpressCategoriesToIds(categories);

    if (categoriesAsIds.length > 0) {
      filters.categories = categoriesAsIds.join(',');
    }
  }

  const url = resolve('documents', filters);

  try {
    const { data, headers } = await fetch(url);
    const items = data.map(p => formatDocument(p));

    res.send({
      total: headers['x-wp-total'],
      totalPages: headers['x-wp-totalpages'],
      items,
    });
  } catch (err) {
    logError('Error fetching documents', err, { url });
    res.status(500).send({});
  }
}

async function guidelinesRoute(req, res) {
  const { slug } = req.params;

  const filters = {
    _embed: true,
    order: defaultOrder,
    orderby: defaultOrderBy,
    slug,
  };

  const url = resolve('guidelines', filters);

  try {
    const { data } = await fetch(url);
    const items = data.map(p => formatPost(p));

    res.send(items);
  } catch (err) {
    logError('Error fetching guidelines', err, { url });
    res.status(500).send([]);
  }
}

async function tagsRoute(req, res) {
  const { slug } = req.query;
  const filters = {
    per_page: 100,
    order: 'asc',
    orderby: 'name',
    hide_empty: 'true',
    slug,
  };
  const url = resolve('tags', filters);

  try {
    const { data } = await fetch(url);
    const response = data.map(t => formatTags(t));

    res.send(response);
  } catch (err) {
    console.error('Error fetching', url, err.message, err.stack);
    res.status(500).send([]);
  }
}

async function infographicTagsRoute(req, res) {
  const url = resolveCustom('infographic-tags');

  try {
    const { data } = await fetch(url);
    const response = data.map(t => formatTags(t));

    res.send(response);
  } catch (err) {
    console.error('Error fetching', url, err.message, err.stack);
    res.status(500).send([]);
  }
}

async function categoriesRoute(req, res) {
  try {
    const { include } = req.query;
    const includess = include ? include.split(',') : [];
    const data = await fetchCategories();

    res.send(data.filter((c) => {
      if (includess.length > 0) {
        return includess.indexOf(c.slug) > -1;
      }

      return true;
    }));
  } catch (err) {
    console.error('Error fetching', err.message, err.stack);
    res.status(500).send([]);
  }
}

async function previewRoute(req, res) {
  const { id, type } = req.query;

  const url = resolveCustom('preview/', {
    id,
    _embed: true,
  });

  if (!previewCredentials) {
    console.warn('WORDPRESS_API_PREVIEW_CREDENTIALS not set');
  }

  const [username = '', password = ''] = previewCredentials.split(':');
  const auth = {
    username,
    password,
  };

  try {
    const { data } = await fetch(url, { auth });

    let items = [];

    switch (type) {
      case 'post':
        items = formatPost(data);
        break;
      case 'page':
        items = [formatPage(data)];
        break;
      default:
        items = data;
    }

    res.send(items);
  } catch (err) {
    logError('Error fetching preview', err, { url });
    res.status(500).send([]);
  }
}

app.get('/pages/:slug?', catchErrors(pagesRoute));
app.get('/posts/:slug?', catchErrors(postsRoute));
app.get('/team_members/:slug?', catchErrors(teamMembersRoute));
app.get('/infographics/:slug?', catchErrors(infographicsRoute));
app.get('/documents/:slug?', catchErrors(documentsRoute));
app.get('/guidelines/:slug?', catchErrors(guidelinesRoute));
app.get('/modular_components/*', catchErrors(modularComponentsRoute));
app.get('/menus/', catchErrors(menusRoute));
app.get('/global/', catchErrors(globalRoute));
app.get('/tags', catchErrors(tagsRoute));
app.get('/infographic-tags', catchErrors(infographicTagsRoute));
app.get('/categories', catchErrors(categoriesRoute));
app.get('/preview', catchErrors(previewRoute));

export default app;

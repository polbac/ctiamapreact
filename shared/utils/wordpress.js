// Mappings between this project and the WordPress project and helpers related to WP

import { extname } from 'path';

function postType(type) {
  switch (type) {
    case 'page': return 'Page';
    case 'post': return 'Blog post';
    case 'statement': return 'Statement';

    case 'document':
    case 'documents':
      return 'Document';

    case 'press_release':
    case 'press-release':
      return 'Press release';

    case 'report': return 'Report';
    case 'event': return 'Event';

    case 'guideline':
    case 'guidelines':
      return 'Guideline';

    default: return type;
  }
}

function dateParser(date) {
  const parsed = Date.parse(date);

  if (Number.isNaN(parsed)) {
    return date;
  }

  const d = new Date(parsed);

  return d.toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' });
}

function mimeTypeToType(mime = '') {
  switch (mime) {
    case 'application/pdf':
      return 'PDF';
    default:
      return '';
  }
}

function urlToType(url = '') {
  const ext = extname(url);

  let result;

  switch (ext.toLowerCase()) {
    case '.pdf':
      result = 'PDF';
      break;
    default:
  }

  return result;
}

function getPrimaryCategory(categories, primaryCategory) {
  if (categories.length === 0) {
    return '';
  }

  const primary = categories.find(c => c.id === primaryCategory || c.term_id === primaryCategory);

  if (primary && primary.name) {
    return primary.name;
  }

  return categories.map(c => c.name)[0];
}

export {
  postType,
  dateParser,
  mimeTypeToType,
  urlToType,
  getPrimaryCategory,
};

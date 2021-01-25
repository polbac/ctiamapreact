import { URL, URLSearchParams } from 'url';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';

function resolveUrl(input, filter = {}, base) {
  const url = new URL(input, base);
  const qs = new URLSearchParams(omitBy(filter, isNil));

  url.search = qs;

  return url.href;
}

function logError(message, error = { message: '', stack: '' }, data = {}) {
  console.error(message, error.message, error.stack, data);
}

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch((err) => {
    logError('Error routing', err);
    res.status(500).send({ error: 'Internal server error' });
  });
}

export {
  resolveUrl,
  catchErrors,
  logError,
};

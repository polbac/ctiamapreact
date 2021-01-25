import querystring from 'querystring';
import mapValues from 'lodash/mapValues';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';

function removeQuestionPrefix(s) {
  if (s.startsWith('?')) {
    return s.substring(1);
  }

  return s;
}

export const parse = s => querystring.parse(removeQuestionPrefix(s));
export const stringify = (obj) => {
  const qs = querystring.stringify(omitBy(obj, val => isNil(val) || val === ''));

  if (qs.length > 0) {
    return `?${qs}`;
  }

  return '';
};
export const createUrl = ({ path, search, query }) => {
  const old = parse(search);
  const obj = { ...old, ...mapValues(query, s => s.length === 0 ? undefined : s) };

  return `${path}${stringify(obj)}`;
};

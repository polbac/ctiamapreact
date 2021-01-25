import { parse, stringify } from './qs';

it('parse querystring', () => {
  const obj = parse('foo=bar');

  expect(obj).toEqual({ foo: 'bar' });
});

it('parse querystring with ? prefix', () => {
  const obj = parse('?foo=bar');

  expect(obj).toEqual({ foo: 'bar' });
});

it('stringify object', () => {
  const s = stringify({ foo: 'bar' });

  expect(s).toBe('?foo=bar');
});

it('remove empty params', () => {
  const s = stringify({ a: 'b', c: null, d: undefined, e: '' });

  expect(s).toBe('?a=b');
});

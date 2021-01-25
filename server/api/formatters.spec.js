import { formatPage } from './formatters';

const emptyPage = {
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  fields: {},
  seo: {
    canonical: '',
    description: '',
    keyword: '',
    noFollow: false,
    noIndex: false,
    opengraph: {
      description: '',
      image: '',
      title: '',
    },
    title: undefined,
    twitter: {
      description: '',
      image: '',
      title: '',
    },
  },
};

it('format page', () => {
  const obj = formatPage({
    id: 1,
    slug: 'format-page',
    title: { rendered: 'format page' },
  });

  expect(obj).toEqual({
    ...emptyPage,
    id: 1,
    title: 'format page',
    slug: 'format-page',
  });
});

// it('format page with basic embeds', () => {
//   const obj = formatPage({
//     id: 1,
//     acf: {
//       guidelines: [{
//         ID: 2,
//       }, {
//         ID: 3,
//       }],
//     },
//     _embedded_acf: {
//       guidelines: [{
//         ID: 2,
//         acf: {
//           foo: 'bar',
//         },
//       }, {
//         ID: 3,
//         acf: {
//           foo: 'foobar',
//           guidelines: [{
//             ID: 2,
//           }],
//         },
//       }],
//     },
//   });

//   expect(obj.fields.guidelines).toHaveLength(2);
//   expect(obj.fields.guidelines[0].fields).toEqual({ foo: 'bar' });
//   expect(obj.fields.guidelines[1].fields).toEqual({
//     foo: 'foobar',
//     guidelines: [{
//       ID: 2,
//       fields: {
//         foo: 'bar',
//       },
//     }],
//   });
// });

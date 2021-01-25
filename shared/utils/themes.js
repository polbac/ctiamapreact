const pages = [
  { id: 'about', dot: 'green', assets: 'green-blue' },
  { id: 'article', dot: 'orange', assets: 'blue-orange' },
  { id: 'channel', dot: 'blue', assets: 'blue-purple' },
  { id: 'consumer', dot: 'purple', assets: 'blue-purple' },
  { id: 'home', dot: 'purple', assets: 'blue-purple' },
  { id: 'industry', dot: 'green', assets: 'green-blue' },
  { id: 'join-us', dot: 'green', assets: 'green-blue' },
  { id: 'news', dot: 'orange', assets: 'blue-orange' },
  { id: 'our-members', dot: 'blue', assets: 'green-blue' },
  { id: 'our-mission', dot: 'blue', assets: 'green-blue' },
  { id: 'positions', dot: 'orange', assets: 'blue-orange' },
];

function findColor(pattern, item) {
  const res = pages.find(p => p.id === pattern);

  if (!res) {
    return undefined;
  }

  return res[item];
}

function dot(pattern) {
  return findColor(pattern, 'dot');
}

function assets(pattern) {
  return findColor(pattern, 'assets');
}

export {
  dot,
  assets,
};

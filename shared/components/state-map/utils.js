const isServer = () => typeof process === 'object';

export default (() => {
  if (isServer) return;

  if ('scrollingElement' in document) return document.scrollingElement;

  const initial = document.documentElement.scrollTop;

  document.documentElement.scrollTop = initial + 1;

  const updated = document.documentElement.scrollTop;

  document.documentElement.scrollTop = initial;

  return (updated > initial ? document.documentElement : document.body);

})();

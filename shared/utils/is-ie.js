function isIE() {
  if (typeof window === 'undefined') {
    return 0;
  }

  const sAgent = window.navigator.userAgent;
  const Idx = sAgent.indexOf('MSIE');

  if (Idx > 0) {
    // If IE, return version number.
    return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf('.', Idx))); // eslint-disable-line
  } else if (!!navigator.userAgent.match(/Trident\/7\./)) { // eslint-disable-line
    // If IE 11 then look for Updated user agent string.
    return 11;
  }

  // It is not IE
  return 0;
}

export default isIE;

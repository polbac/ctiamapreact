export default function enforceHttpsOrWwwMiddleware({ https = false, www = false } = {}) {
  return (req, res, next) => {
    let shouldRedirect = false;
    let { protocol } = req;
    let host = req.get('host');
    const { url } = req;

    // for SSR
    if (host.slice(0, 9) === 'localhost') {
      return next();
    }

    if (https && req.headers['x-forwarded-proto'] !== 'https') {
      protocol = 'https';
      shouldRedirect = true;
    }

    if (www && host.slice(0, 4) !== 'www.') {
      host = `www.${host}`;
      shouldRedirect = true;
    }

    if (shouldRedirect) {
      return res.redirect(301, `${protocol}://${host}${url}`);
    }

    return next();
  };
}

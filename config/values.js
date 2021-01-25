/**
 * Project Configuration.
 *
 * NOTE: All file/folder paths should be relative to the project root. The
 * absolute paths should be resolved during runtime by our build internal/server.
 */

import { resolve } from 'url';

import * as EnvVars from './utils/envVars';
import {
  getPublicUrl,
  getPublicPath,
  getLocalApiUrl,
} from './utils/publicPath';

import codeSplittingConfigExtender from './extenders/codeSplitting';
import singleRouteAppConfigExtender from './extenders/singleRouteApp';
import reactApplicationExtender from './extenders/reactApplication';

const clientBundleWebPath = '/client/';
const baseUrl = EnvVars.string('BASE_URL', 'http://localhost:3000');
const clientDevServerPort = EnvVars.number('CLIENT_DEV_PORT', 7331);
const herokuAppName = EnvVars.string('HEROKU_APP_NAME');
const host = EnvVars.string('HOST', 'localhost');
const port = EnvVars.number('PORT', 3000);
const remoteUrl = EnvVars.string('REMOTE_URL');
const NODE_ENV = EnvVars.string('NODE_ENV', 'development');
const passwordProtect = EnvVars.string('PASSWORD_PROTECT', '');

const urlParams = {
  clientBundleWebPath,
  baseUrl,
  clientDevServerPort,
  herokuAppName,
  host,
  port,
  remoteUrl,
  NODE_ENV,
  passwordProtect,
};

const values = {
  // The configuration values that should be exposed to our client bundle.
  // This value gets passed through the /shared/utils/objects/filterWithRules
  // util to create a filter object that can be serialised and included
  // with our client bundle.
  clientConfigFilter: {
    publicUrl: true,

    // We only need to expose the enabled flag of the service worker.
    serviceWorker: {
      enabled: true,
    },
    // We need to expose all the polyfill.io settings.
    polyfillIO: true,
    // We need to expose all the htmlPage settings.
    helmet: true,
    // Google Analytics is initialized on the client.
    gaId: true,
    // Expose heroku devtools flag
    herokuDevtools: true,

    // Algolia, only read only access
    algoliaAppId: true,
    algoliaApiKeySearch: true,
    algoliaPrimaryIndex: true,

    // Constant Contact
    constantContactUrl: true,
    constantContactList: true,
    constantContactSource: true,
    constantContactApiKey: true,

    // maps
    googleMapsApiKey: true,

    // GSAP Devtools
    gsapDevtools: true,

    baseUrl: true,
  },

  // The host on which the server should bind to.
  host,

  // The port on which the server should bind to.
  port,

  // The port on which the client bundle development server should run.
  clientDevServerPort,

  // Expose environment
  NODE_ENV,

  // Local api url for internal requests
  localApiUrl: getLocalApiUrl(urlParams),

  // The public facing url of the app
  publicUrl: getPublicUrl(urlParams),

  // The path were assets are stored
  publicPath: getPublicPath(urlParams),

  // Algolia
  algoliaAppId: EnvVars.string('ALGOLIASEARCH_APPLICATION_ID', 'AD0D7W4M1M'),
  algoliaApiKey: EnvVars.string('ALGOLIASEARCH_API_KEY', ''),
  algoliaApiKeySearch: EnvVars.string('ALGOLIASEARCH_API_KEY_SEARCH', '887fad2223888f4a9656f7769b308325'),
  algoliaPrimaryIndex: EnvVars.string('ALGOLIASEARCH_PRIMARY_INDEX', 'wp_searchable_posts'),

  // WordPress
  wordpressApiUrl: EnvVars.string('WORDRPESSS_API_URL', 'https://ctiadev.wpengine.com/wp-json/wp/v2/'),
  wordpressCustomApiUrl: EnvVars.string('WORDRPESSS_CUSTOM_API_URL', 'https://ctiadev.wpengine.com/wp-json/ueno/v1/'),
  wordpressUploadsUrl: EnvVars.string('WORDPRESS_UPLOADS_URL', 'https://ctiadev.wpengine.com/wp-content/uploads/'),
  wordpressPreviewCredentials: EnvVars.string('WORDPRESS_API_PREVIEW_CREDENTIALS', 'api:dG8m7e2cWEkHUs'),

  googleMapsApiKey: EnvVars.string('GOOGLE_MAPS_API_KEY', 'AIzaSyA9jPWj0bCHvS1PlKKanIwsDFdQMpiH8WI'),

  // Constant contact for Mobile minute
  constantContactUrl: EnvVars.string('CONSTANT_CONTACT_URL', 'https://visitor2.constantcontact.com/api/signup'),
  constantContactList: EnvVars.string('CONSTANT_CONTACT_LIST', '1277411964'),
  constantContactSource: EnvVars.string('CONSTANT_CONTACT_SOURCE', 'EFD'),
  constantContactApiKey: EnvVars.string('CONSTANT_CONTACT_API_KEY', 'fc348d75-09cb-48ca-a746-ba3f8e9b7a1e'),

  // createSend
  createSendBaseUrl: EnvVars.string('CREATESEND_BASE_URL', 'https://api.createsend.com/api/v3.2'),
  crateSendApiKey: EnvVars.string('CREATESEND_API_KEY', '8cb2456c242f55d90ff59f3b9ebb0e1acd28cff0e720871e'),
  createSendListId: EnvVars.string('CREATESEND_LIST_ID', '85667c394d0e0604251d3af5b190d591'),

  baseUrl,

  // Are we measuring performance?
  performance: EnvVars.bool('PERFORMANCE', false),

  // Enable node-notifier?
  notifier: EnvVars.string('NOTIFIER', 'warn'),

  // Toggle devtools on heroku
  herokuDevtools: EnvVars.bool('HEROKU_DEVTOOLS', false),

  // Show GSAP devtools
  gsapDevtools: EnvVars.bool('GSAP_DEVTOOLS', false),

  // Define a password to access the app
  passwordProtect: EnvVars.string('PASSWORD_PROTECT', ''),

  // Disable server side rendering?
  disableSSR: false,

  // How long should we set the browser cache for the served assets?
  // Don't worry, we add hashes to the files, so if they change the new files
  // will be served to browsers.
  // We are using the "ms" format to set the length.
  // @see https://www.npmjs.com/package/ms
  browserCacheMaxAge: '365d',

  // Enforce HTTPS when behind a load balancer/external router (e.g. Heroku)
  // redirects all requests to their https counterparts
  enforceHttps: EnvVars.bool('ENFORCE_HTTPS', false),
  enforceWww: EnvVars.bool('ENFORCE_WWW', false),

  // Analytics properties
  gaId: EnvVars.string('GA_ID', ''),
  facebookPixel: EnvVars.string('FACEBOOK_PIXEL', ''),
  twitterPixel: EnvVars.string('TWITTER_PIXEL', ''),

  // We use the polyfill.io service which provides the polyfills that a
  // client needs, which is far more optimal than the large output
  // generated by babel-polyfill.
  // Note: we have to keep this seperate from our "htmlPage" configuration
  // as the polyfill needs to be loaded BEFORE any of our other javascript
  // gets parsed.
  polyfillIO: {
    enabled: true,
    url: '//cdn.polyfill.io/v2/polyfill.min.js',
    // Reference https://qa.polyfill.io/v2/docs/features for a full list
    // of features.
    features: [
      // The default list.
      'default',
      'es6',
    ],
  },

  // Basic configuration for the HTML page that hosts our application.
  // We make use of react-helmet to consume the values below.
  // @see https://github.com/nfl/react-helmet
  helmet: {
    htmlAttributes: {
      lang: 'en',
    },
    title: 'Home',
    titleTemplate: 'CTIA - %s',
    meta: [
      /*
        A great reference for favicons:
        https://github.com/audreyr/favicon-cheat-sheet
        It's a pain to manage/generate them. I run both these in order,
        and combine their results:
        http://realfavicongenerator.net/
        http://www.favicomatic.com/
      */
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'description', content: 'CTIA represents the U.S. wireless communications industry and companies throughout the mobile ecosystem.' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=yes' }, // prevents inputs from zooming, but iOS still allows normal pinch zoom
      { name: 'msapplication-TileColor', content: '#78cdd1' },
      { name: 'theme-color', content: '#78cdd1' },

      { name: 'msapplication-TileImage', content: '/favicons/mstile-150x150.png' },
      { name: 'msapplication-square70x70logo', content: '/favicons/mstile-70x70.png' },
      { name: 'msapplication-square150x150logo', content: '/favicons/mstile-150x150.png' },
      { name: 'msapplication-wide310x150logo', content: '/favicons/mstile-310x150.png' },
      { name: 'msapplication-square310x310logo', content: '/favicons/mstile-310x310.png' },
      { property: 'og:image', content: resolve(baseUrl, '/share.jpg') },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: resolve(baseUrl, '/share.jpg') },
      { name: 'twitter:site', content: '@ctia' },
      { name: 'twitter:creator', content: '@ctia' },
      { name: 'twitter:description', content: 'CTIA represents the U.S. wireless communications industry and companies throughout the mobile ecosystem.' },
      { name: 'twitter:title', content: 'CTIA' },
    ],
    link: [
      { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#78cdd1' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-196x196.png', sizes: '196x196' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-16x16.png', sizes: '16x16' },
      { rel: 'icon', sizes: '16x16 32x32', href: '/favicon.ico' },
      { rel: 'manifest', href: '/manifest.json' },
    ],
  },

  // Content Security Policy (CSP)
  // @see server/middleware/security for more info.
  cspExtensions: {
    childSrc: [],
    connectSrc: ['ws:', 'swapi.co'],
    defaultSrc: [],
    fontSrc: [
      'fonts.googleapis.com/css',
      'fonts.gstatic.com',
      '*.ctia.org',
    ],
    imgSrc: [
      'ctia.wpengine.com',
      'ctia-wp.herokuapp.com',
      'ctia.staging.wpengine.com',
      'ctiastage.wpengine.com',
      'ctiadev.wpengine.com',
      'www.ctia.org',
      '*.facebook.com',
      '*.google-analytics.com',
      't.co',
      '*.amazonaws.com',
      '*.ctia.org',
      'maps.googleapis.com',
      'img.youtube.com',
      'newton.newtonsoftware.com',
      'recruitingbypaycor.com',
    ],
    mediaSrc: [
      'ctia.wpengine.com',
      'ctia.staging.wpengine.com',
      'ctiastage.wpengine.com',
      'ctiadev.wpengine.com',
      'ctia-wp.herokuapp.com',
      's3.amazonaws.com',
      '*.ctia.org',
      '*.youtube.com',
      'newton.newtonsoftware.com',
      'recruitingbypaycor.com',
    ],
    frameSrc: [
      '*.vimeo.com',
      '*.youtube.com',
      '*.ctia.org',
      'flickrembed.com',
      '*.youtube.com',
      'youtu.be',
      '*.youtu.be',
      '*.boxwoodtech.com',
      'newton.newtonsoftware.com',
      'recruitingbypaycor.com',
    ],
    manifestSrc: [],
    objectSrc: [],
    scriptSrc: [
      '*.ctia.org',
      'www.ctia.org',
      'ctia.wpengine.com',
      'ctia.staging.wpengine.com',
      'ctiastage.wpengine.com',
      'ctiadev.wpengine.com',
      // Allow scripts from cdn.polyfill.io so that we can import the polyfill.
      'cdn.polyfill.io',
      // For analytics
      '*.google-analytics.com',
      'connect.facebook.net',
      'static.ads-twitter.com',
      'analytics.twitter.com',
      'newton.newtonsoftware.com',
      'recruitingbypaycor.com',
      '*.ctia.org',
      '*.youtube.com',
      '*.ytimg.com',
    ],
    styleSrc: [
      'fonts.googleapis.com',
    ],
  },

  // Path to the public assets that will be served off the root of the
  // HTTP server.
  publicAssetsPath: './public',

  // Where does our build output live?
  buildOutputPath: './build',

  // Which sourcemaps to use in development mode.
  // See https://webpack.js.org/configuration/devtool/ for latest info
  // about build speeds vs accuracity.
  sourcemap: 'source-map',

  // Do you want to included source maps for optimised builds of the client
  // bundle?
  includeSourceMapsForOptimisedClientBundle: false,

  // These extensions are tried when resolving src files for our bundles..
  bundleSrcTypes: ['js', 'jsx', 'json'],

  // Additional asset types to be supported for our bundles.
  // i.e. you can import the following file types within your source and the
  // webpack bundling process will bundle them with your source and create
  // URLs for them that can be resolved at runtime.
  bundleAssetTypes: [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'ico',
    'eot',
    'ttf',
    'woff',
    'woff2',
    'otf',
    'mp4',
    'webm',
  ],

  // What should we name the json output file that webpack generates?
  webpackStatsFileName: 'stats.json',

  // node_modules are not included in any bundles that target "node" as a
  // runtime (e.g.. the server bundle) as including them often breaks builds
  // due to thinks like require statements containing expressions..
  // However. some of the modules contain files need to be processed by
  // one of our Webpack loaders (e.g. CSS). Add any file types to the list
  // below to allow them to be processed by Webpack.
  nodeExternalsFileTypeWhitelist: [
    /\.(eot|woff|woff2|ttf|otf)$/,
    /\.(svg|png|jpg|jpeg|gif|ico)$/,
    /\.(mp4|mp3|ogg|swf|webp)$/,
    /\.(css|scss|sass|sss|less)$/,
  ],

  // Note: you can only have a single service worker instance.  Our service
  // worker implementation is bound to the "client" and "server" bundles.
  // It includes the "client" bundle assets, as well as the public folder assets,
  // and it is served by the "server" bundle.
  serviceWorker: {
    // Enabled?
    enabled: false,
    // Service worker name
    fileName: 'sw.js',
    // Paths to the public assets which should be included within our
    // service worker. Relative to our public folder path, and accepts glob
    // syntax.
    includePublicAssets: [
      // NOTE: This will include ALL of our public folder assets.  We do
      // a glob pull of them and then map them to /foo paths as all the
      // public folder assets get served off the root of our application.
      // You may or may not want to be including these assets.  Feel free
      // to remove this or instead include only a very specific set of
      // assets.
      './**/*',
    ],
    // Offline page file name.
    offlinePageFileName: 'offline.html',
  },

  bundles: {
    client: {
      // Src entry file.
      srcEntryFile: './client/index.js',

      // Src paths.
      srcPaths: [
        './client',
        './shared',
        // The service worker offline page generation needs access to the
        // config folder.  Don't worry we have guards within the config files
        // to ensure they never get included in a client bundle.
        './config',
        './node_modules',
      ],

      // Where does the client bundle output live?
      outputPath: './build/client',

      // What is the public http path at which we must serve the bundle from?
      webPath: clientBundleWebPath,

      // Configuration settings for the development vendor DLL.  This will be created
      // by our development server and provides an improved dev experience
      // by decreasing the number of modules that webpack needs to process
      // for every rebuild of our client bundle.  It by default uses the
      // dependencies configured in package.json however you can customise
      // which of these dependencies are excluded, whilst also being able to
      // specify the inclusion of additional modules below.
      devVendorDLL: {
        // Enabled?
        enabled: true,

        // Specify any dependencies that you would like to include in the
        // Vendor DLL.
        //
        // NOTE: It is also possible that some modules require specific
        // webpack loaders in order to be processed (e.g. CSS/SASS etc).
        // For these cases you don't want to include them in the Vendor DLL.
        include: [
          'react-async-bootstrapper',
          'react-jobs',
          'react',
          'react-dom',
          'react-ga',
          'react-helmet',
          'react-router-dom',
          'react-svgdom-loader',
          'mobx',
          'mobx-react',
          'd3-hierarchy',
          'd3-path',
          'd3-scale',
          'd3-shape',
        ],

        // The name of the vendor DLL.
        name: '__dev_vendor_dll__',
      },
    },

    server: {
      // Src entry file.
      srcEntryFile: './server/index.js',

      // Src paths.
      srcPaths: ['./server', './shared', './config'],

      // Where does the server bundle output live?
      outputPath: './build/server',
    },
  },

  additionalNodeBundles: {
    // NOTE: The webpack configuration and build scripts have been built so
    // that you can add arbitrary additional node bundle configurations here.
    //
    // A common requirement for larger projects is to add additional "node"
    // target bundles (e.g an APi server endpoint). Therefore flexibility has been
    // baked into our webpack config factory to allow for this.
    //
    // Simply define additional configurations similar to below.  The development
    // server will manage starting them up for you.  The only requirement is that
    // within the entry for each bundle you create and return the "express"
    // listener.
    /*
    apiServer: {
      srcEntryFile: './api/index.js',
      srcPaths: [
        './api',
        './shared',
        './config',
      ],
      outputPath: './build/api',
    }
    */
  },

  // These plugin definitions provide you with advanced hooks into customising
  // the project without having to reach into the internals of the tools.
  //
  // We have decided to create this plugin approach so that you can come to
  // a centralised configuration folder to do most of your application
  // configuration adjustments.  Additionally it helps to make merging
  // from the origin starter kit a bit easier.
  plugins: {
    // This plugin allows you to provide final adjustments your babel
    // configurations for each bundle before they get processed.
    //
    // This function will be called once for each for your bundles.  It will be
    // provided the current webpack config, as well as the buildOptions which
    // detail which bundle and mode is being targetted for the current function run.
    babelConfig: (babelConfig, buildOptions) => {
      // eslint-disable-next-line no-unused-vars
      const { target, mode } = buildOptions;
      const { presets, plugins } = babelConfig;

      // Example
      /*
      if (target === 'server' && mode === 'development') {
        babelConfig.presets.push('foo');
      }
     */

      // For code splitting
      plugins.push('universal-import');

      // Decorators for everybody
      plugins.push('transform-decorators-legacy');

      // Remove stage-# prests
      presets.forEach((val, pos) => String(val).match(/stage-\d/) && presets.splice(pos, 1));
      // Add stage-0 to list of presets
      presets.push('stage-0');

      return babelConfig;
    },

    // This plugin allows you to provide final adjustments your webpack
    // configurations for each bundle before they get processed.
    //
    // I would recommend looking at the "webpack-merge" module to help you with
    // merging modifications to each config.
    //
    // This function will be called once for each for your bundles.  It will be
    // provided the current webpack config, as well as the buildOptions which
    // detail which bundle and mode is being targetted for the current function run.
    webpackConfig: (webpackConfig, buildOptions) => {
      // eslint-disable-next-line no-unused-vars
      const { target, mode } = buildOptions;

      // Example:
      /*
      if (target === 'server' && mode === 'development') {
        webpackConfig.plugins.push(new MyCoolWebpackPlugin());
      }
      */

      // Debugging/Logging Example:
      /*
      if (target === 'server') {
        console.log(JSON.stringify(webpackConfig, null, 4));
      }
      */

      // we're not bundling TweenLite
      webpackConfig.externals.push('TweenLite');

      codeSplittingConfigExtender(webpackConfig, buildOptions);
      singleRouteAppConfigExtender(webpackConfig, buildOptions);
      reactApplicationExtender(webpackConfig, buildOptions);

      // Remove mobx devtools from production builds
      if (mode !== 'development') {
        webpackConfig.resolve.alias['components/devtools'] = 'utils/empty';
      }

      return webpackConfig;
    },
  },

  staticSiteGeneration: {

    // This sets the rules for generating the target directory/filename for the included route paths
    //    if true  then  foo/bar  ->  foo/bar/index.html
    //    if false then  foo/bar  ->  foo/bar.html
    //    This value is ignored for custom routes
    allIndex: true,

    // the routes specify the paths that should be rendered to separate HTML files when
    // generating the static site.
    routes: {
      // COMING SOON: The basePaths will be autogenerated and will be all the non-dynamic routes in
      // MainApp.js
      basePaths: ['', 'grid', 'planets', 'about'],

      // omit any paths from the auto-generated base paths here. A path can be removed from base and
      // added to custom in order to give it a non-standard filename or allow the GET to fail at
      // static site generation time
      ignoredPaths: [],

      customRoutes: [{
        source: 'this-is-an-invalid-url-to-generate-a-404-page',
        destination: '404.html',
        ignoreGetError: true,
      }],
    },
  },
};

// This protects us from accidentally including this configuration in our
// client bundle. That would be a big NO NO to do. :)
if (process.env.BUILD_FLAG_IS_CLIENT === 'true') {
  throw new Error(
    "You shouldn't be importing the `<projectroot>/config/values.js` directly into code that will be included in your 'client' bundle as the configuration object will be sent to user's browsers. This could be a security risk! Instead, use the `config` helper function located at `<projectroot>/config/index.js`.",
  );
}

export default values;

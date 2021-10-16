'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const isProduction = EmberAddon.env() === 'production';

const purgeCSS = {
  module: require('@fullhuman/postcss-purgecss'),
  options: {
    content: [
      // add extra paths here for components/controllers which include tailwind classes
      './tests/dummy/app/index.html',
      './tests/dummy/app/templates/**/*.hbs',
      './tests/dummy/app/components/**/*.hbs',
    ],
    defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/.]+/g) || [],
  },
};

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    snippetPaths: ['tests/dummy/app'],
    postcssOptions: {
      compile: {
        plugins: [
          {
            module: require('postcss-import'),
            options: {
              path: ['node_modules'],
            },
          },
          require('tailwindcss')('./tests/dummy/app/tailwind.config.js'),
          ...(isProduction ? [purgeCSS] : []),
        ],
      },
    },
  });

  app.import('node_modules/highlight.js/styles/default.css');
  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app);
};

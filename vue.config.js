const title = require('./package.json').description;

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  ...(!isDev ? {
    publicPath: '/crtweb-game/',
    outputDir: 'docs',
  } : {}),
  chainWebpack(config) {
    config.module.rules.delete('svg');

    config.module.rule('vue-svg')
      .test(/\.svg$/)
      .use('vue-loader')
      .loader('vue-loader-v16')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: false,
      });

    config.module.rule('scss')
      .oneOf('vue-modules')
      .use('css-loader')
      .tap((options) => ({
        ...options,
        modules: {
          localIdentName:
            process.env.NODE_ENV === 'development'
              ? '[local]_[hash:base64:5]'
              : '[hash:base64:5]',
        },
      }));

    config.plugin('html').tap((args) => ([
      { ...args[0], title },
      ...args.slice(1),
    ]));

    return config;
  },
};

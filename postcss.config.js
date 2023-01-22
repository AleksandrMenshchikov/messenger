/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
  plugins: [
    require('autoprefixer'),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('cssnano')({ preset: 'default' }),
  ],
};

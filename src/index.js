//const { semanticReleaseConfig } = require('./config');
const { merge } = require('./utils');
const { configureBranches } = require('./branches');
const { configureTagFormat } = require('./tagFormat');
const { configurePlugins } = require('./plugins');
const { defaultOptions } = require('./defaultOptions');

const semanticReleaseConfigDefault = (options = {}) => {
  const o = merge(defaultOptions, options);
  let config = {
    ...configureTagFormat(o),
    ...configureBranches(o),
    ...configurePlugins(o)
  }
  return config;
}

const semanticReleaseConfigDocker = (options = {}) => {
  return semanticReleaseConfigDefault(
    merge(merge({docker: true}, defaultOptions), options)
  )
}

module.exports = {
  semanticReleaseConfigDefault,
  semanticReleaseConfigDocker
}

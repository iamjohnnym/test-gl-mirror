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
  const overrides = {
    docker: true,
    plugins: {
      git: {
        skipCi: false
      }
    }
  }
  return semanticReleaseConfigDefault(
    merge(merge(defaultOptions, overrides), options)
  )
}

const semanticReleaseConfigTerraform = (options = {}) => {
  const overrides = {
    terraform: true,
    plugins: {
      git: {
        skipCi: false
      }
    }
  }
  return semanticReleaseConfigDefault(
    merge(merge(defaultOptions, overrides), options)
  )
}

module.exports = {
  semanticReleaseConfigDefault,
  semanticReleaseConfigDocker,
  semanticReleaseConfigTerraform
}

const {
  merge, scanProjectDir, isDockerfile,
  isTerraform, isHelm } = require('./utils');
const { configureBranches } = require('./branches');
const { configureTagFormat } = require('./tagFormat');
const { configurePlugins } = require('./plugins');
const { defaultOptions } = require('./defaultOptions');

const semanticReleaseConfig = (options = {}) => {
  const o =  merge(defaultOptions, options);
  let config = {
    ...configureTagFormat(o),
    ...configureBranches(o),
    ...configurePlugins(o)
  }
  return config;
}

const semanticReleaseConfigDefault = async (options = {}) => {
  const projectContents = (
    await scanProjectDir(process.env.npm_config_local_prefix)
    ).flat(Number.POSITIVE_INFINITY)

  const overrides = {
    docker: isDockerfile(projectContents),
    terraform: isTerraform(projectContents),
    helm: isHelm(projectContents)
  }

  return semanticReleaseConfig(
    merge(merge(defaultOptions, overrides), options)
  )
}

const semanticReleaseConfigDocker = (options = {}) => {
  return semanticReleaseConfigDefault(
    merge(defaultOptions, options)
  )
}

const semanticReleaseConfigDockerMulti = (options = {}) => {
  const overrides = {
    dockerMulti: true
  }
  return semanticReleaseConfigDefault(
    merge(merge(defaultOptions, overrides), options)
  )
}

const semanticReleaseConfigTerraform = (options = {}) => {
  return semanticReleaseConfigDefault(
    merge(defaultOptions, options)
  )
}

const semanticReleaseConfigHelm = (options = {}) => {
  return semanticReleaseConfigDefault(
    merge(defaultOptions, options)
  )
}

module.exports = {
  semanticReleaseConfig,
  semanticReleaseConfigDefault,
  semanticReleaseConfigDocker,
  semanticReleaseConfigTerraform,
  semanticReleaseConfigDockerMulti,
  semanticReleaseConfigHelm
}

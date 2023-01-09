const {
  merge, openJsonFile, scanProjectDir,
  isDockerfile, isTerraform, isHelm } = require('./utils');
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
  const overrides = {
    docker: true
  }
  return semanticReleaseConfig(
    merge(merge(defaultOptions, overrides), options)
  )
}

const semanticReleaseConfigDockerMulti = (options = {}) => {
  if (!options.projectPath) {
    throw 'Invalid Docker Multi config. Must set projectPath param in any \
          docker project\'s release config.\nSee README."'
  }
  const packageJson = openJsonFile(`${options.projectPath}/package.json`)
  const overrides = {
    docker: true,
    dockerMulti: true,
    plugins: {
      docker: {
        dockerTags: [
          `{{#if prerelease.[0]}}${packageJson.docker_version}-{{prerelease.[0]}}{{else}}${packageJson.docker_version}-latest{{/if}}`,
          `${packageJson.docker_version}-{{version}}`
        ]
      }
    }
  }
  return semanticReleaseConfig(
    merge(merge(defaultOptions, overrides), options)
  )
}

const semanticReleaseConfigTerraform = (options = {}) => {
  const overrides = {
    terraform: true
  }
  return semanticReleaseConfig(
    merge(merge(defaultOptions, overrides), options)
  )
}

const semanticReleaseConfigHelm = (options = {}) => {
  const overrides = {
    helm: true
  }
  return semanticReleaseConfig(
    merge(merge(defaultOptions, overrides), options)
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

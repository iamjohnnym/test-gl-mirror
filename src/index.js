const { merge, openJsonFile } = require('./utils');
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

const semanticReleaseConfigDockerMulti = (options = {}) => {
  if (!options.projectPath) {
    throw 'Invalid Docker Multi config. Must set projectPath param in any docker project\'s release config.\nSee README."'
  }
  const packageJson = openJsonFile(`${options.projectPath}/package.json`)
  const overrides = {
    docker: true,
    dockerMulti: true,
    plugins: {
      git: {
        skipCi: false
      },
      docker: {
        dockerTags: [
          `{{#if prerelease.[0]}}${packageJson.docker_version}-{{prerelease.[0]}}{{else}}${packageJson.docker_version}-latest{{/if}}`,
          `${packageJson.docker_version}-{{version}}`
        ]
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

const semanticReleaseConfigHelm = (options = {}) => {
  const overrides = {
    helm: true,
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
  semanticReleaseConfigTerraform,
  semanticReleaseConfigDockerMulti,
  semanticReleaseConfigHelm
}

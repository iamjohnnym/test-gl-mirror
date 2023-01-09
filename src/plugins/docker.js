const { merge, openJsonFile } = require('../utils');


function configureDocker(o) {
  if (!o.docker) {
    return [];
  }
  const docker = o.plugins.docker
  if (o.dockerMulti) {
    if (!o.projectPath) {
      throw 'Invalid Docker Multi config. Must set projectPath param in any \
            docker project\'s release config.\nSee README."'
    }
    const packageJson = openJsonFile(`${o.projectPath}/package.json`)
    docker.dockerTags = [
        `{{#if prerelease.[0]}}${packageJson.docker_version}-{{prerelease.[0]}}{{else}}${packageJson.docker_version}-latest{{/if}}`,
        `${packageJson.docker_version}-{{version}}`
      ]
  }
  return [
    [
      '@codedependant/semantic-release-docker', merge({}, docker)
    ]
  ];
}

module.exports = {
  configureDocker
}

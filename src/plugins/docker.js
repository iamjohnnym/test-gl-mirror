const { merge, openJsonFile } = require('../utils');


function configureDocker(o) {
  if (!o.docker) {
    return [];
  }
  const docker = o.plugins.docker
  if (o.dockerMulti) {
    docker.dockerTags = [
        '{{#if prerelease.[0]}}${nextRelease.name}-{{prerelease.[0]}}{{else}}${nextRelease.name}-latest{{/if}}',
        '${nextRelease.name}-{{version}}'
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

const { merge, openJsonFile } = require('../utils');


function configureDocker(o) {
  if (!o.docker) {
    return [];
  }
  const docker = o.plugins.docker
  if (o.dockerMulti) {
    const packageJson = openJsonFile(`${process.env.npm_workspace_path}/package.json`)
    docker.dockerTags = [
        `{{#if prerelease.[0]}}${packageJson.name}-{{prerelease.[0]}}{{else}}${packageJson.name}-latest{{/if}}`,
        `${packageJson.name}-{{version}}`
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

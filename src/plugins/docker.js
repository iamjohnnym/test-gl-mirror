const { merge } = require('../utils');


function configureDocker(o) {
  if (!o.docker) {
    return [];
  }
  return [
    [
      '@codedependant/semantic-release-docker', merge({}, o.plugins.docker)
    ]
  ];
}

module.exports = {
  configureDocker
}

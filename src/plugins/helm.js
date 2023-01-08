const { mergeList } = require('../utils');


function configureHelm(o) {
  if (!o.helm) {
    return [];
  }
  const helm = o.plugins.helm;
  if (o.gitlab) {
    const baseUrl = process.env.CI_API_V4_URL;
    const projectId = process.env.CI_PROJECT_ID;
    o.registryUrl = `${baseUrl}/projects/${projectId}/packages/helm/api/${helm.chartChannel}/charts`
  }

  return [
    [
      'semantic-release-helm', {
        'chartPath': helm.chartPath,
        'registry': helm.chartRegistry,
        'onlyUpdateVersion': helm.chartOnlyUpdateVersion,
        'crPublish': helm.chartCrPublish,
        'crConfigPath': helm.chartCrConfigPath
      }
    ]
  ];
}

module.exports = {
  configureHelm
}

const { mergeList } = require('../utils');


function configureHelm(o) {
  if (!o.helm) {
    return [];
  }
  const helm = o.plugins.helm;
  const baseUrl = process.env.CI_API_V4_URL;
  const projectId = process.env.CI_PROJECT_ID;
  chartRegistry = `${baseUrl}/projects/${projectId}/packages/helm/api/${helm.channel}/charts`

  return [
    [
      'semantic-release-helm', {
        'chartPath': helm.chartPath,
        'registry': chartRegistry,
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

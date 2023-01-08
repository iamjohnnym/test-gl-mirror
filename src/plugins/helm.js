const { mergeList } = require('../utils');


function configureHelm(o) {
  if (!o.helm) {
    return [];
  }
  const helm = o.plugins.helm;
  if (o.gitlab) {
    const baseUrl = process.env.CI_API_V4_URL;
    const projectId = process.env.CI_PROJECT_ID;
    helm.registry = `${baseUrl}/projects/${projectId}/packages/helm/${helm.channel}`
    helm.isChartMuseum = true
  }

  return [
    [
      'semantic-release-helm3', {
        'chartPath': helm.chartPath,
        'registry': helm.registry,
        'onlyUpdateVersion': helm.onlyUpdateVersion,
        'crPublish': helm.crPublish,
        'crConfigPath': helm.crConfigPath,
        'isChartMuseum': helm.isChartMuseum
      }
    ]
  ];
}

module.exports = {
  configureHelm
}

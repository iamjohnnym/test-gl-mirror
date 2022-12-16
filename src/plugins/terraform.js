const { mergeList } = require('../utils');


function configureTerraform(o) {
  if (!o.terraform) {
    return [];
  }
  const terraform = o.plugins.terraform;
  if (o.gitlab) {
    const baseUrl = process.env.CI_API_V4_URL;
    const projectId = process.env.CI_PROJECT_ID;
    // eslint-disable-next-line no-useless-concat
    o.registryUrl = `${baseUrl}/projects/${projectId}/packages/terraform/modules/${terraform.name}/${terraform.system}/` + "${nextRelease.version}/file"
  } else {
    throw 'Unable to upload to registry.  Only Gitlab is supported.';
  }
  // eslint-disable-next-line no-useless-concat
  const fileName = `${terraform.name}-${terraform.system}` + "${nextRelease.version}.tgz";
  let excludes = mergeList(terraform.excludes, terraform.appendExcludes);
  excludes = terraform.excludes.join(' --exclude=');
  const prepareCmd = `tar -cvzf ${fileName} -C ${terraform.dir} --exclude=${excludes} .`
  const publishCmd = `curl --header "JOB-TOKEN: ${terraform.authToken}" --upload-file ${fileName} ${o.registryUrl}`
  return [
    [
      '@semantic-release/exec', {
        'prepareCmd': prepareCmd,
        'publishCmd': publishCmd
      }
    ]
  ];
}

module.exports = {
  configureTerraform
}

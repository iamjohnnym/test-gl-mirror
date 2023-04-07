const { configureCommitAnalyzer } = require("./commitAnalyzer");
const { configureGitlab } = require("./gitlab");
const { configureNpm } = require("./npm");
const { configureGit } = require("./git");
const { configureReleaseNotesGenerator } = require("./releaseNotesGenerator");
const { configureChangelog } = require("./changelog");
const { configureDocker } = require("./docker");
const { configureTerraform } = require("./terraform");
const { configureHelm } = require("./helm");

function configurePlugins(o) {
  return {
    plugins: [
      ...configureCommitAnalyzer(o),
      ...configureReleaseNotesGenerator(o),
      ...configureChangelog(o),
      ...configureNpm(o),
      ...configureHelm(o),
      ...configureDocker(o),
      ...configureTerraform(o),
      ...configureGitlab(o),
      ...configureGit(o),
    ],
  };
}

module.exports = {
  configurePlugins,
};

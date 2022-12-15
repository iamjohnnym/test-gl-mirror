const { configureCommitAnalyzer } = require('./commitAnalyzer');
const { configureGitlab } = require('./gitlab');
const { configureNpm } = require('./npm');
const { configureGit } = require('./git');
const { configureReleaseNotesGenerator } = require('./releaseNotesGenerator');
const { configureChangelog } = require('./changelog');
const { configureDocker } = require('./docker');


function configurePlugins(o) {
  return {
    plugins: [
      ...configureCommitAnalyzer(o),
      ...configureReleaseNotesGenerator(o),
      ...configureChangelog(o),
      ...configureNpm(o),
      ...configureGitlab(o),
      ...configureGit(o),
      ...configureDocker(o)
    ]
  }
}

module.exports = {
  configurePlugins
}

const { mergeList } = require('../utils');


function configureGit(o) {
  if (!o.git) {
    return [];
  }
  o.plugins.git.assets = mergeList(
    o.plugins.git.assets, o.plugins.git.appendAssets);
  if (o.npm) {
    o.plugins.git.assets = mergeList(
      o.plugins.git.assets, o.plugins.npm.assets);
  }
  if (o.changelog) {
    o.plugins.git.assets = mergeList(
      o.plugins.git.assets, [o.plugins.changelog.changelogFile]);
  }
  if (o.plugins.git.skipCi) {
    o.plugins.git.message += ' [skip ci]';
  }
  if (o.releaseNotesGenerator) {
    o.plugins.git.message += '\n\n${nextRelease.notes}';
  }
  return [
    [
      '@semantic-release/git',
      {
        'assets': o.plugins.git.assets,
        'message': o.plugins.git.message
      }
    ]
  ];
}

module.exports = {
  configureGit
}

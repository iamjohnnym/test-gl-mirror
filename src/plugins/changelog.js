function configureChangelog(o) {
  if (!o.changelog) {
    return [];
  }
  return [
    [
      '@semantic-release/changelog',
      {
        'changelogFile': o.plugins.changelog.changelogFile
      }
    ]
  ];
}

module.exports = {
  configureChangelog
}

function configureReleaseNotesGenerator(o) {
  if (!o.releaseNotesGenerator) {
    return []
  }
  return ['@semantic-release/release-notes-generator', {
    "preset": "conventionalcommits"
  }];
}

module.exports = {
  configureReleaseNotesGenerator
}

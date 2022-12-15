function configureReleaseNotesGenerator(o) {
  if (!o.releaseNotesGenerator) {
    return []
  }
  return ['@semantic-release/release-notes-generator'];
}

module.exports = {
  configureReleaseNotesGenerator
}

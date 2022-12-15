function configureCommitAnalyzer(o) {
  if (!o.commitAnalyzer) {
    return []
  }
  return ['@semantic-release/commit-analyzer']
}

module.exports = {
  configureCommitAnalyzer
}

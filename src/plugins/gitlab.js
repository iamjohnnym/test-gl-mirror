function configureGitlab(o) {
  if (!o.gitlab) {
    return []
  }
  return ['@semantic-release/gitlab']
}

module.exports = {
  configureGitlab
}

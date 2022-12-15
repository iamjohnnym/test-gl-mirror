function configureNpm(o) {
  if (!o.npm) {
    return []
  }
  return ['@semantic-release/npm']
}

module.exports = {
  configureNpm
}

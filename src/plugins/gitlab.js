const { merge } = require("../utils");

function configureGitlab(o) {
  if (!o.gitlab) {
    return [];
  }
  const gitlab = o.plugins.gitlab;
  return [["@semantic-release/gitlab", merge({}, gitlab)]];
}

module.exports = {
  configureGitlab,
};

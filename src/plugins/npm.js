const { merge } = require("../utils");

function configureNpm(o) {
  if (!o.npm) {
    return [];
  }
  const npm = o.plugins.npm;
  return [["@semantic-release/npm", merge({}, npm)]];
}

module.exports = {
  configureNpm,
};

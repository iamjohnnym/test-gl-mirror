const { mergeList, setBranchName, sanitizeBranchName } = require('./utils');

function configureBranches(o, preRelease=true) {
  let appendBranches = [];
  if (preRelease === true && o.branchName !== 'main') {
    const branchName = setBranchName(o.branchName);
    const sanitizedBranchRef = sanitizeBranchName(o.branchName);
    appendBranches = mergeList(
      o.branches.appendBranches, [{
        name: branchName, prerelease: o.preReleaseName
      }]);
  }
  branches = mergeList(o.branches.main, appendBranches);
  return {
    branches: branches
  };
}

module.exports = {
  configureBranches
}

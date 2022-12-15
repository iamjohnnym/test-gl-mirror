const { merge } = require('lodash');

const mergeList = (a, b = []) => Array.from(new Set([...a, ...b]));

const setBranchName = (branchName) => {
  if (branchName === 'main') {
    branchName = 'disabled';
  }
  return branchName;
}

const sanitizeBranchName = (branchName) => {
  const sanitizeBranchName = branchName.replace(/\/|_/g, "-");
  return sanitizeBranchName;
}

module.exports = {
  merge,
  mergeList,
  setBranchName,
  sanitizeBranchName
}

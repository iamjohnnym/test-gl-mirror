const { merge } = require('lodash');
const fs = require('fs');

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

const openJsonFile = (path) => {
  try {
    const data = fs.readFileSync(path,{encoding:'utf8', flag:'r'})
    return JSON.parse(data);
  } catch (error) {
    throw `An error occurred: ${error}`;
  }
}

module.exports = {
  merge,
  mergeList,
  openJsonFile,
  setBranchName,
  sanitizeBranchName
}

const { merge } = require('lodash');
const fs = require('fs');
const { readdir } = require('fs/promises');
const { join } = require('path');

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

const scanProjectDir = async (projectDirPath) => await Promise.all(
  (await readdir(projectDirPath, {withFileTypes: true})).map(async (dirent) => {
    const path = join(projectDirPath, dirent.name)
    return dirent.isDirectory() ? await scanProjectDir(path) : path
  })
)

const findFileInProjectContents = (projectFiles, findFilename) => {
  if (projectFiles.findIndex(element => element.includes(findFilename)) !== -1) {
    return true;
  }
  return false;
}

const isDockerfile = (projectFiles) => {
  return findFileInProjectContents(projectFiles, 'Dockerfile');
}

const isTerraform = (projectFiles) => {
  return findFileInProjectContents(projectFiles, '.tf');
}

const isHelm = (projectFiles) => {
  return findFileInProjectContents(projectFiles, 'Chart.yaml');
}

module.exports = {
  merge,
  mergeList,
  openJsonFile,
  setBranchName,
  sanitizeBranchName,
  scanProjectDir,
  findFileInProjectContents,
  isDockerfile,
  isTerraform,
  isHelm
}

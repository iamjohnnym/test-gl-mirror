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
    return dirent.isDirectory() ? await deepReadDir(path) : path
  })
)

const findInProjectFiles = (projectFiles, findFilename) => {
  if (projectFiles.findIndex(element => element.includes(findFilename))) {
    return true;
  }
  return false;
}

const isDockerfile = (projectFiles) => {
  if (findInProjectFiles(projectFiles, 'Dockerfile')) {
    return true;
  }
  return false;
}

const isTerraform = (projectFiles) => {
  if (findInProjectFiles(projectFiles, '.tf')) {
    return true;
  }
  return false;
}

const isHelm = (projectFiles) => {
  if (findInProjectFiles(projectFiles, 'Chart.yaml')) {
    return true;
  }
  return false;
}

module.exports = {
  merge,
  mergeList,
  openJsonFile,
  setBranchName,
  sanitizeBranchName,
  scanProjectDir,
  isDockerfile,
  isTerraform,
  isHelm
}

const branchName = process.env.CI_COMMIT_REF_NAME || process.env.SR_BRANCH_NAME || "disabled";
const isGitlab = process.env.GITLAB_CI || false;
const dockerProject = process.env.CI_PROJECT_NAMESPACE || process.env.SR_DOCKER_PROJECT || null;
const dockerRegistry = process.env.CI_REGISTRY || process.env.SR_DOCKER_REGISTRY || null;
const dockerImage = process.env.CI_PROJECT_NAME || process.env.SR_DOCKER_IMAGE || null;

const defaultOptions = {
  branchName: branchName,
  preRelease: true,
  commitAnalyzer: true,
  releaseNotesGenerator: true,
  changelog: true,
  npm: true,
  gitlab: isGitlab,
  git: true,
  docker: false,
  tag: {
    prefixed: false,
    format: '${version}'
  },
  branches: {
    main: [
      'main'
    ],
    appendBranches: []
  },
  plugins: {
    commitAnalyzer: {},
    releaseNotesGenerator: {},
    changelog: {
      changelogFile: 'CHANGELOG.md'
    },
    npm: {
      assets: [
        'package.json',
        'src/**/*.js',
        'lib/**/*.js',
        'docs'
      ]
    },
    gitlab: {},
    git: {
      skipCi: true,
      assets: ['README.md'],
      message: 'chore(release): ${nextRelease.version}',
      appendAssets: []
    },
    docker: {
      dockerTags: [
        '{{#if prerelease}}{{prerelease}}{{else}}latest{{/if}}',
        '{{version}}'
      ],
      dockerImage: dockerImage,
      dockerRegistry: dockerRegistry,
      dockerProject: dockerProject,
      dockerFile: 'Dockerfile',
      dockerContext: '.',
      dockerLogin: true,
      dockerArgs: {},
      dockerPublish: true,
      dockerVerifyCmd: false
    }
  }
}

module.exports = { defaultOptions }

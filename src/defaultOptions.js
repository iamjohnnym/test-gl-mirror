const branchName =  process.env.SR_BRANCH_NAME || process.env.CI_COMMIT_REF_NAME || "disabled";
const isGitlab = process.env.GITLAB_CI || false;

/*
Semantic-Release-Docker
*/

const dockerProject = process.env.SR_DOCKER_PROJECT || process.env.CI_PROJECT_NAMESPACE || null;
const dockerRegistry = process.env.SR_DOCKER_REGISTRY || process.env.CI_REGISTRY || null;
const dockerImage = process.env.SR_DOCKER_IMAGE || process.env.CI_PROJECT_NAME || null;

/*
Semantic-Release-Terraform CUSTOM
*/

const terraformName = process.env.SR_TERRAFORM_NAME || process.env.CI_PROJECT_NAME || null;
const terraformDir = process.env.SR_TERRAFORM_DIR || process.env.CI_PROJECT_DIR || './';
const terraformSystem = process.env.SR_TERRAFORM_SYSTEM || 'local';
const terraformAuthToken = process.env.SR_TERRAFORM_AUTH_TOKEN || process.env.CI_JOB_TOKEN || null;

/*
Semantic-Release-Helm
*/

const chartPath = process.env.SR_CHART_PATH || './chart';
const chartRegistry = process.env.SR_CHART_REGISTRY || "";
const chartOnlyUpdateVersion = process.env.SR_CHART_ONLY_UPDATE_VERSION || false;
const chartCrPublish = process.env.SR_CHART_CR_PUBLISH || false;
const chartCrConfigPath = process.env.SR_CHART_CR_CONFIG_PATH || "";
const chartIsChartMuseum = process.env.SR_CHART_IS_CHART_MUSEUM || false;
const chartChannel = process.env.SR_CHART_CHANNEL || "stable";

const defaultOptions = {
  branchName: branchName,
  preRelease: true,
  preReleaseName: 'rc',
  commitAnalyzer: true,
  releaseNotesGenerator: true,
  changelog: true,
  npm: true,
  gitlab: isGitlab,
  git: true,
  docker: false,
  dockerMulti: false,
  terraform: false,
  helm: false,
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
      skipCi: false,
      assets: ['README.md'],
      message: 'chore(release): ${nextRelease.version}',
      appendAssets: []
    },
    docker: {
      dockerTags: [
        '{{#if prerelease.[0]}}{{prerelease.[0]}}{{else}}latest{{/if}}',
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
    },
    terraform: {
      name: terraformName,
      dir: terraformDir,
      system: terraformSystem,
      authToken: terraformAuthToken,
      registryUrl: "",
      excludes: [
        './.git', './node_modules', './.npm', './*.xml', './*.json',
        './examples'
      ],
      appendExcludes: []
    },
    helm: {
      chartPath: chartPath,
      registry: chartRegistry,
      onlyUpdateVersion: chartOnlyUpdateVersion,
      crPublish: chartCrPublish,
      crConfigPath: chartCrConfigPath,
      isChartMuseum: chartIsChartMuseum,
      channel: chartChannel
    }
  }
}

module.exports = { defaultOptions }

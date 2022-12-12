let name = process.env.CI_COMMIT_REF_NAME;
const sanitize_name = name.replace(/\/|_/g, "-");
if (name === 'main') {
  name = 'disabled';
}
module.exports = {
  branches: [
    'main',
    {name: `${name}`, prerelease: `${sanitize_name}`}
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        'changelogFile': 'CHANGELOG.md'
      }
    ],
    ['@semantic-release/exec', {
      'verifyReleaseCmd': 'echo  ${nextRelease.version} > .version'
    }],
    '@semantic-release/npm',
    [
      '@semantic-release/gitlab',
      {
        'assets': ['package.json', 'src/**/*.js', 'docs', 'README.md', 'CHANGELOG.md'],
        'message': 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ],
    ['@codedependant/semantic-release-docker', {
      'dockerTags': [
      '{{#if prerelease.[0]}}{{prerelease.[0]}}{{else}}latest{{/if}}',
      '{{version}}'
    ],
      'dockerRegistry': 'registry.gitlab.com'
    }],
  ]
};

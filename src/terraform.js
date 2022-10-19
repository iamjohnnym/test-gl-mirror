let name = process.env.CI_COMMIT_REF_NAME;
const sanitize_name = name.replace(/\/|_/g, "-");
if (name === 'main') {
  name = 'disabled'
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
    '@semantic-release/gitlab',
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        'assets': ['package.json', 'src/**/*.js', 'docs', 'README.md', 'CHANGELOG.md'],
        'message': 'chore(release): ${nextRelease.version} \n\n${nextRelease.notes}'
      }
    ]
  ],
  verifyConditions: [
    '@semantic-release/changelog',
    '@semantic-release/git',
    '@semantic-release/gitlab'
  ],
  tagFormat: [
    '${version}'
  ]
};

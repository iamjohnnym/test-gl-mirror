# nodejs-semantic-release-config

Shared config for semantic release for all Beepbeepgo npm packages hosted in Gitlab

## Plugins

- NPM
- Terraform
- Docker
- MultiDocker
- Helm

## Usage

### NPM Config (default)

```js
//release.config.js
const { semanticReleaseConfigDefault } = require('@beepbeepgo/semantic-release');
module.exports = semanticReleaseConfigDefault();
```

### Terraform Config

```js
//release.config.js
const { semanticReleaseConfigTerraform } = require('@beepbeepgo/semantic-release');
module.exports = semanticReleaseConfigTerraform();
```

### Docker Multi Config

This config leverages a configuration to be compatible with `multi-semantic-release`
which utilizes the `npm` workspaces at the root level of the project.  When
it gets executed via the pipeline, it will create a new Docker image for each
of the workspace projects, only when there are changes within that workspace
though.  Otherwise, it gets ignored.  As time goes on, each of the workspace
projects will contain different tagged semvers.

Here's a project which currently uses it.

- [docker/python](https://gitlab.com/beepbeepgo/dev-infra/docker/python)

The semantic release config would be configured like this.

```js
//release.config.js
const { semanticReleaseConfigDockerMulti } = require('@beepbeepgo/semantic-release');
module.exports = semanticReleaseConfigDockerMulti();
```

#### Project Configuration for Multi Semantic-Release

Project tree

```bash
% tree
.
├── 3.9-slim
│   ├── Dockerfile
│   ├── package.json
│   └── release.config.js
├── README.md
├── package-lock.json
├── package.json
└── renovate.json
```

The package.json file would be declared similar to this.  Slimmed down to remove
the unnessary bits for this example.

```js
//package.json
{
    "name": "@beepbeepgo/python",
    "version": "1.0.0",
    "description": "Python Docker Images",
    "private": true,
    "scripts": {
        "semantic-release": "multi-semantic-release"
    },
    "workspaces": [
        "3.9-slim"
    ],
    "dependencies": {
        "@beepbeepgo/semantic-release": "^1.0.7",
        "multi-semantic-release": "^3.0.1"
    }
}
```

Then, in each _workspace_, there needs to be a corresponding `package.json`. Let's
assume we're creating the workspace, `3.9-slim`, as listed above.  There must be
a directory called `3.9-slim` within the project.

```bash
mkdir 3.9-slim
```

Within this directly, create the `package.json`.  For this exmaple, ours will
look like the following.  The name should be a concatenated version of the
Gitlab project's name, `python` in this case, and the workspace name, `3.9-slim`,
and delimited with `-`.  It should be `python-3.9-slim`.  Ensure the package is
listed as `private: true`, because we're not publishing to Gitlab's npm registry.
Finally, set a field for `docker_version`.  It should also match the name of the
workspace, `3.9-slim` in this case.

```js
//3.9-slim/package.json
{
    "name": "python-3.9-slim",
    "version": "1.0.0",
    "description": "Python 3.9-slim Docker Image",
    "private": true,
    "docker_version": "3.9-slim",
    "scripts": {
        "semantic-release": "semantic-release"
    }
}
```

Be sure to place your `Dockerfile` inside of the workspace.

Finally, create a lock file at the project root.

```bash
npm i --package-lock-only
```

### Docker Config

```js
//release.config.js
const { semanticReleaseConfigDocker } = require('@beepbeepgo/semantic-release');
module.exports = semanticReleaseConfigDocker();
```

### Docker Helm

```js
//release.config.js
const { semanticReleaseConfigHelm } = require('@beepbeepgo/semantic-release');
module.exports = semanticReleaseConfigHelm();
```

## Notable Semantic-Release Packages

- [semantic-release-docker](https://github.com/esatterwhite/semantic-release-docker)
- [multi-semantic-release](https://github.com/dhoulb/multi-semantic-release)

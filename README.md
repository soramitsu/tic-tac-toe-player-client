## Iroha tic-tac-toe Web UI


[![npm version](https://img.shields.io/npm/v/iroha-helpers.svg)](https://www.npmjs.com/package/iroha-helpers)
[![Iroha 1.0.0-rc5](https://img.shields.io/badge/Iroha-1.0.0--rc5-red.svg)](https://github.com/hyperledger/iroha/releases/tag/1.0.0_rc5)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square)](https://opensource.org/licenses/Apache-2.0)

This application is custom-made fork from the Iroha Wallet with very limited functionality whose purpose was to showcase some basic (but cool) feature of Iroha blockchain (read more about [Iroha](http://iroha.readthedocs.io/)).

## Getting Started

### Prerequisites

To run the UI we need a working Iroha instance. You can read how to launch it on [Iroha's docs](http://iroha.readthedocs.io/en/latest/getting_started/index.html). In this guide we assume a local Iroha instance listening on `localhost:50051`.

The ```docker/docker-compose.yml``` file gives an idea of what other services need to be running.
```bash
docker-compose -f docker/docker-compose.yaml up
```

In order to start we need to set up the tic-tac-toe game backend first as described here https://github.com/soramitsu/tic-tac-toe-arbitrator-client/blob/master/README.md .


### Installation

Install npm packages.

```bash
# install dependencies
yarn install
```

### Run dev server

To run application

```bash
yarn serve
```

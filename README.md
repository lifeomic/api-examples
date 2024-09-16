# LifeOmic API Examples

This repository contains usage examples of the LifeOmic APIs. Please see the README in the `graphql` directory for additional details.

## Getting Started

### LifeOmic CLI

To start, download and install the [LifeOmic CLI](https://github.com/lifeomic/cli). This is done via installing with npm or yarn like so:

```
npm install -g @lifeomic/cli

yarn global add @lifeomic/cli
```

Once installed, run the setup: `lo setup` to configure usage of the CLI tool.

### API Usage

Most of LifeOmic's APIs (with a few exceptions) require valid authentication and authorization, done by utilizing the `Authorization` header in requests.

In these cases, a valid token must be present in the header in the form of `Bearer {token}`.

To get a token to test the APIs with, the CLI can be used: `lo auth -c`. The `-c` parameter copies the token to the clipboard.

The API URL is: `https://api.us.lifeomic.com`

## GraphQL API

The URL for the GraphQL endpoint is located at `{baseUrl}/v1/graphql`

The schema can be downloaded using the [Apollo CLI](https://github.com/apollographql/apollo-cli), provided an authorization header is supplied. 

(Optional) For types, we utilize Apollo Codegen: Once the Apollo CLI is installed (either globally or localling in the project), `apollo codegen:generate --clientSchema={path/to/schema}`.

## Bitesize Examples

The `bitesize` directory contains standalone examples of various means of using the GraphQL API.

**observations.ts**

Included is a sample for handling `Observation`s, a type that encompasses various readings for a patient, such as body weight or height.

## lifeomic-sample-graphql-client-app

This is a full, runnable React Native app. For authentication, you will need to copy the `.env.sample` file in the root of the directory to `.env`, and provide a token as the value, which you can obtain from the LifeOmic CLI: `lo auth -c`. Currently, this renders a list of weight observations for your user.

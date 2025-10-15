import { javascript, typescript } from "projen";

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "@nikovirtala/typesafe-dynamodb",
  projenrcTs: true,
  typescriptVersion: "latest",
  repository: "https://github.com/nikovirtala/typesafe-dynamodb",
  deps: ["zod"],
  peerDeps: [
    "@aws-sdk/client-dynamodb",
    "@aws-sdk/lib-dynamodb",
    "@aws-sdk/types",
    "@aws-sdk/util-dynamodb",
    "@smithy/smithy-client",
    "@types/aws-lambda",
  ],
  gitignore: [".DS_Store", ".dccache"],
  releaseToNpm: true,
  prettier: true,
  dependabot: false,
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ["auto-approve", "auto-merge"],
    },
  },
  autoApproveOptions: {
    secret: "GITHUB_TOKEN",
    allowedUsernames: ["nikovirtala"],
  },
  mergify: true,
  autoMerge: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
});

project.synth();

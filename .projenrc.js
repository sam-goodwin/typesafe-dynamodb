const { typescript } = require("projen");
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "typesafe-dynamodb",

  deps: [
    "aws-sdk",
    "@aws-sdk/client-dynamodb",
    "@aws-sdk/smithy-client",
    "@aws-sdk/types",
    "@types/aws-lambda",
  ],
  eslintOptions: {
    ignorePatterns: ["**"],
  },
  gitignore: [".DS_Store"],
  releaseToNpm: true,
});

project.synth();

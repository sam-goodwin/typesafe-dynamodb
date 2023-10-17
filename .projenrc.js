const { typescript } = require("projen");
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "typesafe-dynamodb",
  typescriptVersion: "latest",
  deps: [
    "aws-sdk",
    "@aws-sdk/client-dynamodb",
    "@aws-sdk/lib-dynamodb",
    "@aws-sdk/smithy-client",
    "@aws-sdk/types",
    "@aws-sdk/util-dynamodb",
    "@types/aws-lambda",
  ],
  eslintOptions: {
    ignorePatterns: ["**"],
  },
  tsconfig: {
    compilerOptions: {
      lib: ["dom"],
    },
  },
  gitignore: [".DS_Store", ".dccache"],
  releaseToNpm: true,
});

project.synth();

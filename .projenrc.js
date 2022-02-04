const { typescript } = require("projen");
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "typesafe-dynamodb",

  devDeps: ["aws-sdk"],
  eslintOptions: {
    ignorePatterns: ["**"],
  },
  releaseToNpm: true,
});
project.synth();

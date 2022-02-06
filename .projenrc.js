const { typescript } = require("projen");
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "typesafe-dynamodb",

  devDeps: ["aws-sdk"],
  eslintOptions: {
    ignorePatterns: ["**"],
  },
  gitignore: [".DS_Store"],
  releaseToNpm: true,
});

project.synth();

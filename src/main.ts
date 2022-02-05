import * as AWS from "aws-sdk";

const ddb = new AWS.DynamoDB({
  region: "us-west-2",
});

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

async function main() {
  const response = await ddb
    .getItem({
      TableName: "test",
      Key: {
        key: {
          S: "key",
        },
      },
      ExpressionAttributeNames: {
        "#l": "list",
      },
      ProjectionExpression: "#l[1], #l[0]",
    })
    .promise();

  console.log(JSON.stringify(response.Item, null, 2));
}

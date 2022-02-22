import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import "jest";
import { TypeSafeBatchGetItemCommand } from "../src/batch-get-item-command";
import { TypeSafeDeleteItemCommand } from "../src/delete-item-command";
import { TypeSafeGetItemCommand } from "../src/get-item-command";
import { TypeSafePutItemCommand } from "../src/put-item-command";
import { TypeSafeQueryCommand } from "../src/query-command";

interface MyType {
  key: string;
  sort: number;
  list: string[];
}

const client = new DynamoDBClient({});

const PutItemCommand = TypeSafePutItemCommand<MyType>();
const GetItemCommand = TypeSafeGetItemCommand<MyType, "key", "sort">();
const DeleteItemCommand = TypeSafeDeleteItemCommand<MyType, "key", "sort">();
const QueryCommand = TypeSafeQueryCommand<MyType>();
const BatchGetItemCommand = TypeSafeBatchGetItemCommand<
  MyType,
  "key",
  "sort"
>();

it("dummy", () => {
  expect(1).toBe(1);
});

export async function foo() {
  const get = await client.send(
    new GetItemCommand({
      TableName: "",
      Key: {
        key: {
          S: "",
        },
        sort: {
          N: "1",
        },
      },
      ProjectionExpression: "sort, key",
    })
  );
  get.Item?.key;
  // @ts-expect-error
  get.Item?.list;

  const batchGet = await client.send(
    new BatchGetItemCommand({
      RequestItems: {
        TableName: {
          Keys: [{ key: { S: "" }, sort: { N: "1" } }],
          ProjectionExpression: "sort, list[0]",
        },
      },
    })
  );
  batchGet.Responses!.TableName[0].sort;
  // @ts-expect-error
  batchGet.Responses!.TableName[0].list[1];

  const put = await client.send(
    new PutItemCommand({
      TableName: "",
      Item: {
        key: {
          S: "",
        },
        list: {
          L: [],
        },
        sort: {
          N: "1",
        },
      },
    })
  );
  put.Attributes?.key;

  const del = await client.send(
    new DeleteItemCommand({
      TableName: "",
      Key: {
        key: {
          S: "",
        },
        sort: {
          // @ts-expect-error
          S: "",
        },
      },
    })
  );
  del.Attributes?.key;

  const query = await client.send(
    new QueryCommand({
      TableName: "",
      KeyConditionExpression: "#key = :val",
      AttributesToGet: ["key"],
      ExpressionAttributeNames: {
        "#key": "key",
      },
      ExpressionAttributeValues: {
        ":val": {
          S: "val",
        },
      },
    })
  );
  query.Items?.[0].key;
}

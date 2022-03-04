import "jest";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { TypeSafeGetItemCommand } from "../src/get-item-command";
import { TypeSafeDeleteItemCommand } from "../src/delete-item-command";
import { TypeSafePutItemCommand } from "../src/put-item-command";
import { TypeSafeQueryCommand } from "../src/query-command";
import { TypeSafeUpdateItemCommand } from "../src/update-item-command";
import { JsonFormat } from "../src/json-format";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { TypeSafeDocumentClientV3 } from "../src/document-client-v3";

interface MyType {
  key: string;
  sort: number;
  list: string[];
}

const client = new DynamoDBClient({});

const docClient = DynamoDBDocumentClient.from(
  client
) as TypeSafeDocumentClientV3<MyType, "key", "sort">;

const PutItemCommand = TypeSafePutItemCommand<MyType, JsonFormat.Document>();
const UpdateItemCommand = TypeSafeUpdateItemCommand<
  MyType,
  "key",
  "sort",
  JsonFormat.Document
>();
const GetItemCommand = TypeSafeGetItemCommand<
  MyType,
  "key",
  "sort",
  JsonFormat.Document
>();
const DeleteItemCommand = TypeSafeDeleteItemCommand<
  MyType,
  "key",
  "sort",
  JsonFormat.Document
>();
const QueryCommand = TypeSafeQueryCommand<MyType, JsonFormat.Document>();

it("dummy", () => {
  expect(1).toBe(1);
});

export async function foo() {
  const get = await client.send(
    new GetItemCommand({
      TableName: "",
      Key: {
        key: "",
        sort: 1,
      },
      ProjectionExpression: "sort, key",
    })
  );
  get.Item?.key;
  // @ts-expect-error
  get.Item?.list;

  const getDoc = await docClient.get({
    TableName: "",
    Key: {
      key: "",
      sort: 1,
    },
    ProjectionExpression: "sort, key",
  });
  getDoc.Item?.key;
  // @ts-expect-error
  getDoc.Item?.list;

  const put = await client.send(
    new PutItemCommand({
      TableName: "",
      Item: {
        key: "",
        list: [],
        sort: 1,
      },
    })
  );
  put.Attributes?.key;

  const putDoc = await docClient.put({
    TableName: "",
    Item: {
      key: "",
      list: [],
      sort: 1,
    },
  });
  putDoc.Attributes?.key;

  const del = await client.send(
    new DeleteItemCommand({
      TableName: "",
      Key: {
        key: "",
        // @ts-expect-error
        sort: "",
      },
    })
  );
  del.Attributes?.key;

  const delDoc = await docClient.delete({
    TableName: "",
    Key: {
      key: "",
      // @ts-expect-error
      sort: "",
    },
  });
  delDoc.Attributes?.key;

  const query = await client.send(
    new QueryCommand({
      TableName: "",
      KeyConditionExpression: "#key = :val",
      AttributesToGet: ["key"],
      ExpressionAttributeNames: {
        "#key": "key",
      },
      ExpressionAttributeValues: {
        ":val": "val",
      },
    })
  );
  query.Items?.[0].key;

  const queryDoc = await docClient.query({
    TableName: "",
    KeyConditionExpression: "#key = :val",
    AttributesToGet: ["key"],
    ExpressionAttributeNames: {
      "#key": "key",
    },
    ExpressionAttributeValues: {
      ":val": "val",
    },
  });
  queryDoc.Items?.[0].key;
}

export async function updateItem() {
  const defaultBehavior = await client.send(
    new UpdateItemCommand({
      TableName: "",
      Key: {
        key: "",
        sort: 1,
      },
      UpdateExpression: "#k = :v",
      ExpressionAttributeNames: {
        "#k": "list",
      },
      ExpressionAttributeValues: {
        ":v": "val",
        ":v2": "val2",
      },
      ConditionExpression: "#k = :v2",
    })
  );
  // @ts-expect-error - default ReturnValues is None
  defaultBehavior.Attributes?.key;

  const returnNone = await client.send(
    new UpdateItemCommand({
      TableName: "",
      Key: {
        key: "",
        sort: 1,
      },
      UpdateExpression: "a = 1",
      ReturnValues: "NONE",
    })
  );
  // @ts-expect-error - nothing is Returned
  returnNone.Attributes?.key;

  const returnAllNew = await client.send(
    new UpdateItemCommand({
      TableName: "",
      Key: {
        key: "",
        sort: 1,
      },
      UpdateExpression: "a = 1",
      ReturnValues: "ALL_NEW",
    })
  );
  returnAllNew.Attributes?.key?.length;

  const returnAllOld = await client.send(
    new UpdateItemCommand({
      TableName: "",
      Key: {
        key: "",
        sort: 1,
      },
      UpdateExpression: "a = 1",
      ReturnValues: "ALL_OLD",
    })
  );
  returnAllOld.Attributes?.key?.length;

  const returnUpdatedNew = await client.send(
    new UpdateItemCommand({
      TableName: "",
      Key: {
        key: "",
        sort: 1,
      },
      UpdateExpression: "a = 1",
      ReturnValues: "UPDATED_NEW",
    })
  );
  returnUpdatedNew.Attributes?.key?.length;

  const returnUpdatedOld = await client.send(
    new UpdateItemCommand({
      TableName: "",
      Key: {
        key: "",
        sort: 1,
      },
      UpdateExpression: "a = 1",
      ReturnValues: "UPDATED_OLD",
    })
  );
  returnUpdatedOld.Attributes?.key?.length;
}

export async function updateItemDocClient() {
  const defaultBehavior = await docClient.update({
    TableName: "",
    Key: {
      key: "",
      sort: 1,
    },
    UpdateExpression: "#k = :v",
    ExpressionAttributeNames: {
      "#k": "list",
    },
    ExpressionAttributeValues: {
      ":v": "val",
      ":v2": "val2",
    },
    ConditionExpression: "#k = :v2",
  });
  // @ts-expect-error - default ReturnValues is None
  defaultBehavior.Attributes?.key;

  const returnNone = await docClient.update({
    TableName: "",
    Key: {
      key: "",
      sort: 1,
    },
    UpdateExpression: "a = 1",
    ReturnValues: "NONE",
  });
  // @ts-expect-error - nothing is Returned
  returnNone.Attributes?.key;

  const returnAllNew = await docClient.update({
    TableName: "",
    Key: {
      key: "",
      sort: 1,
    },
    UpdateExpression: "a = 1",
    ReturnValues: "ALL_NEW",
  });
  returnAllNew.Attributes?.key?.length;

  const returnAllOld = await docClient.update({
    TableName: "",
    Key: {
      key: "",
      sort: 1,
    },
    UpdateExpression: "a = 1",
    ReturnValues: "ALL_OLD",
  });
  returnAllOld.Attributes?.key?.length;

  const returnUpdatedNew = await docClient.update({
    TableName: "",
    Key: {
      key: "",
      sort: 1,
    },
    UpdateExpression: "a = 1",
    ReturnValues: "UPDATED_NEW",
  });
  returnUpdatedNew.Attributes?.key?.length;

  const returnUpdatedOld = await docClient.update({
    TableName: "",
    Key: {
      key: "",
      sort: 1,
    },
    UpdateExpression: "a = 1",
    ReturnValues: "UPDATED_OLD",
  });
  returnUpdatedOld.Attributes?.key?.length;
}

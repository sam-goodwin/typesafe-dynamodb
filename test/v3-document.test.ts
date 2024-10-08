import "jest";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { TypeSafeDocumentClientV3 } from "../src/document-client-v3";
import { TypeSafePutDocumentCommand } from "../src/put-document-command";
import { TypeSafeUpdateDocumentCommand } from "../src/update-document-command";
import { TypeSafeQueryDocumentCommand } from "../src/query-document-command";
import { TypeSafeGetDocumentCommand } from "../src/get-document-command";
import { TypeSafeDeleteDocumentCommand } from "../src/delete-document-command";

interface MyType {
  key: string;
  sort: number;
  list: string[];
}

const client = new DynamoDBClient({});

const docClient = DynamoDBDocumentClient.from(
  client
) as TypeSafeDocumentClientV3<MyType, "key", "sort">;

const PutItemCommand = TypeSafePutDocumentCommand<MyType>();
const UpdateItemCommand = TypeSafeUpdateDocumentCommand<
  MyType,
  "key",
  "sort"
>();
const GetItemCommand = TypeSafeGetDocumentCommand<MyType, "key", "sort">();
const DeleteItemCommand = TypeSafeDeleteDocumentCommand<
  MyType,
  "key",
  "sort"
>();
const QueryCommand = TypeSafeQueryDocumentCommand<MyType>();

it("dummy", async () => {
  expect(1).toBe(1);
});

export async function foo() {
  const get = await docClient.send(
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

  const put = await docClient.send(
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

  const del = await docClient.send(
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

  const query = await docClient.send(
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
  const defaultBehavior = await docClient.send(
    new UpdateItemCommand({
      TableName: "",
      Key: {
        key: "",
        sort: 1,
      },
      UpdateExpression: "#k = :v, #k_v = :v_2",
      ExpressionAttributeNames: {
        "#k": "list",
        "#k_v": "list_v",
      },
      ExpressionAttributeValues: {
        ":v": "val",
        ":v2": "val2",
        ":v_2": "val_2",
      },
      ConditionExpression: "#k = :v2",
    })
  );
  // @ts-expect-error - default ReturnValues is None
  defaultBehavior.Attributes?.key;

  const returnNone = await docClient.send(
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

  const returnAllNew = await docClient.send(
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

  const returnAllOld = await docClient.send(
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

  const returnUpdatedNew = await docClient.send(
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

  const returnUpdatedOld = await docClient.send(
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

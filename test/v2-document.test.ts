import "jest";

test("dummy", () => {
  expect(1).toBe(1);
});

import { DynamoDB } from "aws-sdk";

import { ApplyProjection } from "../src/projection";
import { TypeSafeDocumentClientV2 } from "../src/document-client-v2";

export interface MyItem {
  pk: string;
  sk: string;
  attr: string;
  list?: MyItem[];
}

const table = new DynamoDB.DocumentClient() as TypeSafeDocumentClientV2<
  MyItem,
  "pk",
  "sk"
>;

export async function foo(userId: string) {
  const response = await table
    .query({
      TableName: "TableName",
      AttributesToGet: ["attr"],
      KeyConditionExpression: "#key = :val",
      FilterExpression: "#key2 = :val2",
      ExpressionAttributeNames: {
        "#key": "",
        "#key2": "",
      },
      ExpressionAttributeValues: {
        ":val": "val",
        ":val2": true,
      },
    })
    .promise();

  if (response.Items) {
    response.Items[0].attr;
  }

  await table
    .get({
      TableName: "",
      Key: {
        pk: `USER#${userId}`,
        sk: "",
      },
      ProjectionExpression: "attr",
    })
    .promise();

  await table
    .delete({
      TableName: "",
      Key: {
        pk: `USER#${userId}`,
        sk: "",
      },
    })
    .promise();

  await table
    .put({
      TableName: "",
      Item: {
        pk: "pk",
        sk: "sk",
        attr: "attr",
        list: [
          {
            pk: "pk",
            sk: "sk",
            attr: "attr",
          },
        ],
      },
      ConditionExpression: "#name = :value and #n = 0",
      ExpressionAttributeValues: {
        ":value": {
          N: "1",
        },
      },
      ExpressionAttributeNames: {
        "#name": "sam",
        "#n": "sam",
      },
    })
    .promise();

  interface Record {
    id: string;
    record?: Record;
    items: (Record | undefined)[];
    tuple: [a: "string", b: number];
  }

  type A1 = ApplyProjection<Record, "id">;
  const a1: A1 = null as any;
  a1.id;
  type A2 = ApplyProjection<Record, "record">;
  const a2: A2 = null as any;
  a2.record?.id;
  type A3 = ApplyProjection<Record, "record.id">;
  const a3: A3 = null as any;
  a3.record?.id;

  type A4 = ApplyProjection<Record, "items[2], items[3]">;
  const a4: A4 = null as any;
  a4.items[0];

  type A5 = ApplyProjection<Record, "tuple[1], tuple[0]">;
  const a5: A5 = null as any;
  a5.tuple[0];
  a5.tuple[1];

  type A6 = ApplyProjection<Record, "tuple[0], tuple[1]">;
  const a6: A6 = null as any;
  a6.tuple[0];
  a6.tuple[1];
}

const TableName = "test";

interface User<UserID extends string = string> {
  PK: `USER#${UserID}`;
  SK: `#PROFILE#${UserID}`;
  Username: string;
  FullName: string;
  Email: string;
  CreatedAt: Date;
  Address: string;
}

interface Order<
  UserID extends string = string,
  OrderID extends string = string
> {
  PK: `USER#${UserID}`;
  SK: `ORDER#${OrderID}`;
  Username: string;
  /**
   * Order ID.
   */
  OrderID: OrderID;
  Status: "PLACED" | "SHIPPED";
  CreatedAt: Date;
  Address: string;
}

declare const client: TypeSafeDocumentClientV2<User | Order, "PK", "SK">;

export async function getProfile(userId: String) {
  const profile = await client
    .get({
      TableName,
      Key: {
        PK: `USER#${userId}`,
        SK: `#PROFILE#${userId}`,
      },
    })
    .promise();

  profile.Item?.FullName;
  // @ts-expect-error
  profile.Item?.OrderID;
}

export async function getOrder(userId: string, orderId: string) {
  const order = await client
    .get({
      TableName,
      Key: {
        PK: `USER#${userId}`,
        SK: `ORDER#${orderId}`,
      },
    })
    .promise();

  order.Item?.OrderID;
  // @ts-expect-error
  order.Item?.FullName;
}

export async function updateOrder(userId: string, orderId: string) {
  const defaultBehavior = await client
    .update({
      TableName: "",
      Key: {
        PK: `USER#${userId}`,
        SK: `ORDER#${orderId}`,
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
    .promise();
  // @ts-expect-error - default ReturnValues is None
  defaultBehavior.Attributes?.defaultBehavior.Attributes?.key;

  const returnNone = await client
    .update({
      TableName: "",
      Key: {
        PK: `USER#${userId}`,
        SK: `ORDER#${orderId}`,
      },
      UpdateExpression: "a = 1",
      ReturnValues: "NONE",
    })
    .promise();
  // @ts-expect-error - nothing is Returned
  returnNone.Attributes.PK.S;

  const returnAllNew = await client
    .update({
      TableName: "",
      Key: {
        PK: `USER#${userId}`,
        SK: `ORDER#${orderId}`,
      },
      UpdateExpression: "a = 1",
      ReturnValues: "ALL_NEW",
    })
    .promise();
  returnAllNew.Attributes?.PK;
  returnAllNew.Attributes?.OrderID;
  // @ts-expect-error
  returnAllNew.Attributes?.FullName;

  const returnAllOld = await client
    .update({
      TableName: "",
      Key: {
        PK: `USER#${userId}`,
        SK: `ORDER#${orderId}`,
      },
      UpdateExpression: "a = 1",
      ReturnValues: "ALL_OLD",
    })
    .promise();
  returnAllOld.Attributes?.PK?.length;

  const returnUpdatedNew = await client
    .update({
      TableName: "",
      Key: {
        PK: `USER#${userId}`,
        SK: `ORDER#${orderId}`,
      },
      UpdateExpression: "a = 1",
      ReturnValues: "UPDATED_NEW",
    })
    .promise();
  returnUpdatedNew.Attributes?.PK?.length;

  const returnUpdatedOld = await client
    .update({
      TableName: "",
      Key: {
        PK: `USER#${userId}`,
        SK: `ORDER#${orderId}`,
      },
      UpdateExpression: "a = 1",
      ReturnValues: "UPDATED_OLD",
    })
    .promise();
  returnUpdatedOld.Attributes?.PK?.length;

  const narrowedType = await client
    .update({
      TableName: "",
      Key: {
        PK: `USER#${userId}`,

        SK: `ORDER#${orderId}`,
      },
      UpdateExpression: "a = 1",
      ReturnValues: "UPDATED_OLD",
    })
    .promise();

  narrowedType.Attributes?.OrderID?.length;
  // @ts-expect-error - FullName does not exist on order
  narrowedType.Attributes?.FullName?.length;
}

import "jest";

test("dummy", () => {
  expect(1).toBe(1);
});

import { DynamoDB } from "aws-sdk";

import { TypeSafeDynamoDBv2 } from "../src/client-v2";
import { ApplyProjection } from "../src/projection";

export interface MyItem {
  pk: string;
  sk: string;
  attr: string;
  list?: MyItem[];
}

const table = new DynamoDB() as unknown as TypeSafeDynamoDBv2<
  MyItem,
  "pk",
  "sk"
>;

export async function foo() {
  const response = await table
    .query({
      TableName: "TableName",
      AttributesToGet: ["attr"],
      KeyConditionExpression: "#key = :val",
      ProjectionExpression: "#key2 = :val2",
      ExpressionAttributeNames: {
        "#key": "",
        "#key2": "",
      },
      ExpressionAttributeValues: {
        ":val": {
          S: "val",
        },
        ":val2": {
          BOOL: true,
        },
      },
    })
    .promise();

  if (response.Items) {
    response.Items[0].attr;
  }

  await table
    .getItem({
      TableName: "",
      Key: {
        pk: {
          S: "",
        },
        sk: {
          S: "",
        },
      },
      ProjectionExpression: "attr",
    })
    .promise();

  await table
    .deleteItem({
      TableName: "",
      Key: {
        pk: {
          S: "",
        },
        sk: {
          S: "",
        },
      },
    })
    .promise();

  await table
    .putItem({
      TableName: "",
      Item: {
        pk: {
          S: "pk",
        },
        sk: {
          S: "sk",
        },
        attr: {
          S: "attr",
        },
        list: {
          L: [
            {
              M: {
                pk: {
                  S: "pk",
                },
                sk: {
                  S: "sk",
                },
                attr: {
                  S: "attr",
                },
              },
            },
          ],
        },
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
  OrderID: string;
  Status: "PLACED" | "SHIPPED";
  CreatedAt: Date;
  Address: string;
}

declare const client: TypeSafeDynamoDBv2<User | Order, "PK", "SK">;

export async function getProfile(userId: String) {
  const profile = await client
    .getItem({
      TableName,
      Key: {
        PK: {
          S: `USER#${userId}`,
        },
        SK: {
          S: `#PROFILE#${userId}`,
        },
      },
    })
    .promise();

  profile.Item?.FullName;
  // @ts-expect-error
  profile.Item?.OrderID;
}

export async function getOrder(userId: string, orderId: string) {
  const order = await client
    .getItem({
      TableName,
      Key: {
        PK: {
          S: `USER#${userId}`,
        },
        SK: {
          S: `ORDER#${orderId}`,
        },
      },
    })
    .promise();

  order.Item?.OrderID;
  // @ts-expect-error
  order.Item?.FullName;
}

export async function batchGet(userId: string, orderId: string) {
  const response = await client
    .batchGetItem({
      RequestItems: {
        MyTable: {
          Keys: [
            {
              PK: { S: `USER#${userId}` },
              SK: { S: `ORDER#${orderId}` },
            },
          ],
          ProjectionExpression: "Username,Status",
        },
      },
    })
    .promise();

  response.Responses!.MyTable[0].Username;
  // @ts-expect-error
  response.Responses!.MyTable[0].Address;
}

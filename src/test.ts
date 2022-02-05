import { DynamoDB } from "aws-sdk";

import { TypeSafeDynamoDB } from ".";
import {
  ApplyProjection,
  ParseProjectionExpression,
} from "./projection-expression";

export interface MyItem {
  pk: string;
  sk: string;
  attr: string;
  list?: MyItem[];
}

const table = new DynamoDB() as unknown as TypeSafeDynamoDB<MyItem, "pk", "sk">;

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

  const get = await table
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
      ProjectionExpression: "attr, list[0]",
    })
    .promise();

  get.Item?.list?.L[0].M.pk;

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
}

interface Record {
  id: string;
  record?: Record;
  items: (Record | undefined)[];
  tuple: [a: "string", b: number];
}

type A1 = ApplyProjection<Record, "id">;
type A2 = ApplyProjection<Record, "record">;
type A3 = ApplyProjection<Record, "record.id">;

declare const a3: A3;
a3.record?.id;

type A4 = ApplyProjection<Record, "items[2], items[3]">;
declare const a4: A4;
a4.items[0];

type A5 = ApplyProjection<Record, "tuple[1], tuple[0]">;
declare const a5: A5;
a5.tuple[0];
a5.tuple[1];

type A6 = ApplyProjection<Record, "tuple[0], tuple[1]">;
declare const a6: A6;

type test_prop_ref = ParseProjectionExpression<"ABC, abc.def.ghi">;
type test_array_ref = ParseProjectionExpression<"a[0][0].kvp">;
type test_array_ref2 = ParseProjectionExpression<"ABC[:a]">;

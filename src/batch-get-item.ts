import type { DynamoDB } from "aws-sdk";
import { ToAttributeMap } from "./attribute-value";
import { KeyAttribute, KeyAttributeToObject } from "./key";
import { ApplyProjection } from "./projection";

// export interface KeysAndAttributes<
//   Item extends object,
//   PartitionKey extends keyof Item,
//   RangeKey extends keyof Item | undefined,
//   Key extends KeyAttribute<Item, PartitionKey, RangeKey>
// > extends Omit<DynamoDB.KeysAndAttributes, "Keys"> {
//   Keys: Key[];
// }

export interface BatchGetItemInput<
  Item extends object,
  Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  AttributesToGet extends keyof Item | undefined,
  ProjectionExpression extends string | undefined
> extends Omit<DynamoDB.BatchGetItemInput, "RequestItems"> {
  RequestItems: {
    [tableName: string]: {
      Keys: Key[];
      AttributesToGet?: readonly AttributesToGet[] | AttributesToGet[];
      ProjectionExpression?: ProjectionExpression;
    };
  };
}

type ResponseItem<
  Item extends object,
  Key extends KeyAttribute<Item, any, any>,
  AttributesToGet extends keyof Item | undefined,
  ProjectionExpression extends string | undefined
> = ToAttributeMap<
  undefined extends AttributesToGet
    ? undefined extends ProjectionExpression
      ? Extract<Item, KeyAttributeToObject<Item, Key>>
      : Extract<
          ApplyProjection<
            Extract<Item, KeyAttributeToObject<Item, Key>>,
            Extract<ProjectionExpression, string>
          >,
          object
        >
    : Pick<
        Extract<Item, KeyAttributeToObject<Item, Key>>,
        Extract<AttributesToGet, keyof Item>
      >
>;

export interface BatchGetItemOutput<
  Item extends object,
  Key extends KeyAttribute<Item, any, any>,
  AttributesToGet extends keyof Item | undefined,
  ProjectionExpression extends string | undefined
> extends Omit<DynamoDB.BatchGetItemOutput, "Responses"> {
  Responses?: {
    [tableName: string]: ResponseItem<
      Item,
      Key,
      AttributesToGet,
      ProjectionExpression
    >[];
  };
}

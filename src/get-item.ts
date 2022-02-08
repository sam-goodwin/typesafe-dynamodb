import type { DynamoDB } from "aws-sdk";
import { ToAttributeMap } from "./attribute-value";
import { KeyAttribute, KeyAttributeToObject } from "./key";
import { ApplyProjection } from "./projection";

export interface GetItemInput<
  Item extends object,
  Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  AttributesToGet extends keyof Item | undefined,
  ProjectionExpression extends string | undefined
> extends Omit<
    DynamoDB.GetItemInput,
    "Key" | "AttributesToGet" | "ProjectionExpression"
  > {
  Key: Key;
  AttributesToGet?: readonly AttributesToGet[] | AttributesToGet[];
  ProjectionExpression?: ProjectionExpression;
}
export interface GetItemOutput<
  Item extends object,
  Key extends KeyAttribute<Item, any, any>,
  AttributesToGet extends keyof Item | undefined,
  ProjectionExpression extends string | undefined
> extends Omit<DynamoDB.GetItemOutput, "Item"> {
  Item?: ToAttributeMap<
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
}

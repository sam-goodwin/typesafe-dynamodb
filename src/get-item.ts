import type { DynamoDB } from "aws-sdk";
import { ToAttributeMap } from "./attribute-value";
import { KeyAttribute } from "./key";
import { Narrow } from "./narrow";
import { ApplyProjection } from "./projection";

export interface GetItemInput<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
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
        ? Narrow<Item, Key>
        : Extract<
            ApplyProjection<
              Narrow<Item, Key>,
              Extract<ProjectionExpression, string>
            >,
            object
          >
      : Pick<Narrow<Item, Key>, Extract<AttributesToGet, keyof Item>>
  >;
}

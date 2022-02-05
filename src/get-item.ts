import type { DynamoDB } from "aws-sdk";
import { ToAttributeMap } from "./attribute-value";
import { KeyAttribute } from "./key";
import { ApplyProjection } from "./projection-expression";

export interface GetItemInput<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  AttributesToGet extends keyof Item | undefined,
  ProjectionExpression extends string | undefined
> extends Omit<
    DynamoDB.GetItemInput,
    "Key" | "AttributesToGet" | "ProjectionExpression"
  > {
  Key: KeyAttribute<Item, PartitionKey, RangeKey>;
  readonly AttributesToGet?: readonly AttributesToGet[];
  readonly ProjectionExpression?: ProjectionExpression;
}
export interface GetItemOutput<
  Item extends object,
  AttributesToGet extends keyof Item | undefined,
  ProjectionExpression extends string | undefined
> extends Omit<DynamoDB.GetItemOutput, "Item"> {
  Item?: ToAttributeMap<
    undefined extends AttributesToGet
      ? undefined extends ProjectionExpression
        ? Item
        : Extract<
            ApplyProjection<Item, Extract<ProjectionExpression, string>>,
            object
          >
      : Pick<Item, Extract<AttributesToGet, keyof Item>>
  >;
}

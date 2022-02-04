import type { DynamoDB } from "aws-sdk";
import { ToAttributeMap } from "./attribute-value";
import { KeyAttribute } from "./key";

export interface GetItemInput<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  AttributesToGet extends keyof Item | undefined
> extends Omit<DynamoDB.GetItemInput, "Key" | "AttributesToGet"> {
  Key: KeyAttribute<Item, PartitionKey, RangeKey>;
  readonly AttributesToGet?: readonly AttributesToGet[];
}
export interface GetItemOutput<
  Item extends object,
  AttributesToGet extends keyof Item | undefined = undefined
> extends Omit<DynamoDB.GetItemOutput, "Item"> {
  Item?: ToAttributeMap<
    undefined extends AttributesToGet
      ? Item
      : Pick<Item, Extract<AttributesToGet, keyof Item>>
  >;
}

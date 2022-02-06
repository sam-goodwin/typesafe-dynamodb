import type { DynamoDB } from "aws-sdk";
import { ToAttributeMap } from "./attribute-value";
import {
  ExpressionAttributeNames,
  ExpressionAttributeValues,
} from "./expression-attributes";

export type QueryInput<
  Item extends object,
  KeyConditionExpression extends string | undefined,
  FilterExpression extends string | undefined,
  AttributesToGet extends keyof Item | undefined
> = Omit<
  DynamoDB.QueryInput,
  "AttributesToGet" | "KeyConditionExpression" | "FilterExpression"
> &
  ExpressionAttributeNames<KeyConditionExpression> &
  ExpressionAttributeNames<FilterExpression> &
  ExpressionAttributeValues<KeyConditionExpression> &
  ExpressionAttributeValues<FilterExpression> & {
    KeyConditionExpression?: KeyConditionExpression;
    FilterExpression?: FilterExpression;
    readonly AttributesToGet?: readonly AttributesToGet[];
  };

export interface QueryOutput<
  Item extends object,
  AttributesToGet extends keyof Item | undefined
> extends Omit<DynamoDB.QueryOutput, "Items"> {
  Items?: ToAttributeMap<
    undefined extends AttributesToGet
      ? Item
      : Pick<Item, Extract<AttributesToGet, keyof Item>>
  >[];
}

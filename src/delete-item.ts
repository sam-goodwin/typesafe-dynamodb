import type { DynamoDB } from "aws-sdk";
import { ToAttributeMap } from "./attribute-value";
import {
  ExpressionAttributeNames,
  ExpressionAttributeValues,
} from "./expression-attributes";
import { KeyAttribute } from "./key";

export type DeleteItemInput<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
  ConditionExpression extends string | undefined,
  ReturnValue extends DynamoDB.ReturnValue = "NONE"
> = Omit<
  DynamoDB.DeleteItemInput,
  | "ConditionExpression"
  | "ExpressionAttributeNames"
  | "ExpressionAttributeValues"
  | "Item"
  | "ReturnValues"
> &
  ExpressionAttributeNames<ConditionExpression> &
  ExpressionAttributeValues<ConditionExpression> & {
    Key: Key;
    ReturnValues?: ReturnValue;
    ConditionExpression?: ConditionExpression;
  };

export interface DeleteItemOutput<
  Item extends object,
  ReturnValue extends DynamoDB.ReturnValue = "NONE"
> extends Omit<DynamoDB.DeleteItemOutput, "Attributes"> {
  Attributes?: "ALL_OLD" | "ALL_NEW" extends ReturnValue
    ? ToAttributeMap<Item>
    : undefined | "NONE" extends ReturnValue
    ? undefined
    : "UPDATED_OLD" | "UPDATED_NEW" extends ReturnValue
    ? Partial<ToAttributeMap<Item>>
    : Partial<ToAttributeMap<Item>>;
}

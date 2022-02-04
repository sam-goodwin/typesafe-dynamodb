import type { DynamoDB } from "aws-sdk";
import { ToAttributeMap } from "./attribute-value";
import {
  ExpressionAttributeNames,
  ExpressionAttributeValues,
} from "./expression";

export type PutItemInput<
  Item extends object,
  ConditionExpression extends string | undefined,
  ReturnValue extends DynamoDB.ReturnValue = "NONE"
> = Omit<
  DynamoDB.PutItemInput,
  | "ConditionExpression"
  | "ExpressionAttributeNames"
  | "ExpressionAttributeValues"
  | "Item"
  | "ReturnValues"
> &
  ExpressionAttributeNames<ConditionExpression> &
  ExpressionAttributeValues<ConditionExpression> & {
    Item: ToAttributeMap<Item>;
    ReturnValues?: ReturnValue;
    ConditionExpression?: ConditionExpression;
  };

export interface PutItemOutput<
  Item extends object,
  ReturnValue extends DynamoDB.ReturnValue = "NONE"
> extends Omit<DynamoDB.PutItemOutput, "Attributes"> {
  Attributes?: "ALL_OLD" | "ALL_NEW" extends ReturnValue
    ? ToAttributeMap<Item>
    : undefined | "NONE" extends ReturnValue
    ? undefined
    : "UPDATED_OLD" | "UPDATED_NEW" extends ReturnValue
    ? Partial<ToAttributeMap<Item>>
    : Partial<ToAttributeMap<Item>>;
}

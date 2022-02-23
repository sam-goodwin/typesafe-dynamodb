import type { DynamoDB } from "aws-sdk";
import { ToAttributeMap } from "./attribute-value";
import {
  ExpressionAttributeNames,
  ExpressionAttributeValues,
} from "./expression-attributes";
import { KeyAttribute } from "./key";
import { Narrow } from "./narrow";

export type UpdateItemInput<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
  UpdateExpression extends string,
  ConditionExpression extends string | undefined,
  ReturnValue extends DynamoDB.ReturnValue = "NONE"
> = Omit<
  DynamoDB.UpdateItemInput,
  | "ConditionExpression"
  | "UpdateExpression"
  | "ExpressionAttributeNames"
  | "ExpressionAttributeValues"
  | "Item"
  | "ReturnValues"
> &
  ExpressionAttributeNames<ConditionExpression> &
  ExpressionAttributeValues<ConditionExpression> &
  ExpressionAttributeNames<UpdateExpression> &
  ExpressionAttributeValues<UpdateExpression> & {
    Key: Key;
    ReturnValues?: ReturnValue;
    UpdateExpression: UpdateExpression;
    ConditionExpression?: ConditionExpression;
  };

export interface UpdateItemOutput<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
  ReturnValue extends DynamoDB.ReturnValue = "NONE"
> extends Omit<DynamoDB.UpdateItemOutput, "Attributes"> {
  Attributes?: ReturnValue extends undefined | "NONE"
    ? undefined
    : ReturnValue extends "ALL_OLD" | "ALL_NEW"
    ? Partial<ToAttributeMap<Narrow<Item, Key>>>
    : ReturnValue extends "UPDATED_OLD" | "UPDATED_NEW"
    ? Partial<ToAttributeMap<Narrow<Item, Key>>>
    : Partial<ToAttributeMap<Narrow<Item, Key>>>;
}

import type { DynamoDB } from "aws-sdk";
import {
  ExpressionAttributeNames,
  ExpressionAttributeValues,
} from "./expression-attributes";
import { FormatObject, JsonFormat } from "./format";
import { TableKey } from "./key";
import { Narrow } from "./narrow";

export type UpdateItemInput<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  Key extends TableKey<Item, PartitionKey, RangeKey, Format>,
  UpdateExpression extends string,
  ConditionExpression extends string | undefined,
  ReturnValue extends DynamoDB.ReturnValue,
  Format extends JsonFormat
> = Omit<
  DynamoDB.UpdateItemInput,
  | "ConditionExpression"
  | "UpdateExpression"
  | "ExpressionAttributeNames"
  | "ExpressionAttributeValues"
  | "Key"
  | "ReturnValues"
> &
  ExpressionAttributeNames<ConditionExpression> &
  ExpressionAttributeValues<ConditionExpression, Format> &
  ExpressionAttributeNames<UpdateExpression> &
  ExpressionAttributeValues<UpdateExpression, Format> & {
    Key: Key;
    ReturnValues?: ReturnValue;
    UpdateExpression: UpdateExpression;
    ConditionExpression?: ConditionExpression;
  };

export interface UpdateItemOutput<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  Key extends TableKey<Item, PartitionKey, RangeKey, Format>,
  ReturnValue extends DynamoDB.ReturnValue,
  Format extends JsonFormat
> extends Omit<DynamoDB.UpdateItemOutput, "Attributes"> {
  Attributes?: FormatObject<
    ReturnValue extends undefined | "NONE"
      ? undefined
      : ReturnValue extends "ALL_OLD" | "ALL_NEW"
      ? Partial<Narrow<Item, Key, Format>>
      : ReturnValue extends "UPDATED_OLD" | "UPDATED_NEW"
      ? Partial<Narrow<Item, Key, Format>>
      : Partial<Narrow<Item, Key, Format>>,
    Format
  >;
}

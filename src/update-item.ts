import type { DynamoDB } from "aws-sdk";
import type {
  ExpressionAttributeNames,
  ExpressionAttributeValues,
} from "./expression-attributes";
import type { FormatObject, JsonFormat } from "./json-format";
import type { TableKey } from "./key";
import type { Narrow } from "./narrow";
import type {
  DynamoDBClientResolvedConfig,
  ReturnValue as DynamoDBReturnValue,
} from "@aws-sdk/client-dynamodb";
import type { MetadataBearer } from "@aws-sdk/types";
import type { Command } from "@aws-sdk/smithy-client";

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
      ? Narrow<Item, Key, Format>
      : ReturnValue extends "UPDATED_OLD" | "UPDATED_NEW"
      ? Partial<Narrow<Item, Key, Format>>
      : Partial<Narrow<Item, Key, Format>>,
    Format
  >;
}

export type UpdateCommand<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  Format extends JsonFormat
> = new <
  Key extends TableKey<Item, PartitionKey, RangeKey, Format>,
  UpdateExpression extends string,
  ConditionExpression extends string | undefined = undefined,
  ReturnValue extends DynamoDBReturnValue = "NONE"
>(
  input: UpdateItemInput<
    Item,
    PartitionKey,
    RangeKey,
    Key,
    UpdateExpression,
    ConditionExpression,
    ReturnValue,
    Format
  >
) => Command<
  UpdateItemInput<
    Item,
    PartitionKey,
    RangeKey,
    Key,
    UpdateExpression,
    ConditionExpression,
    ReturnValue,
    Format
  >,
  UpdateItemOutput<Item, PartitionKey, RangeKey, Key, ReturnValue, Format> &
    MetadataBearer,
  DynamoDBClientResolvedConfig
> & {
  _brand: "UpdateItemCommand";
};

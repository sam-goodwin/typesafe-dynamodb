import type { DynamoDB } from "aws-sdk";
import type {
  ExpressionAttributeNames,
  ExpressionAttributeValues,
} from "./expression-attributes";
import type { FormatObject, JsonFormat } from "./json-format";
import type {
  DynamoDBClientResolvedConfig,
  ReturnValue as DynamoDBReturnValue,
} from "@aws-sdk/client-dynamodb";
import type { Command } from "@smithy/smithy-client";
import type { MetadataBearer } from "@aws-sdk/types";

export type PutItemInput<
  Item extends object,
  ConditionExpression extends string | undefined,
  ReturnValue extends DynamoDB.ReturnValue,
  Format extends JsonFormat
> = Omit<
  DynamoDB.PutItemInput,
  | "ConditionExpression"
  | "ExpressionAttributeNames"
  | "ExpressionAttributeValues"
  | "Item"
  | "ReturnValues"
> &
  ExpressionAttributeNames<ConditionExpression> &
  ExpressionAttributeValues<ConditionExpression, Format> & {
    Item: FormatObject<Item, Format>;
    ReturnValues?: ReturnValue;
    ConditionExpression?: ConditionExpression;
  };

export interface PutItemOutput<
  Item extends object,
  ReturnValue extends DynamoDB.ReturnValue,
  Format extends JsonFormat
> extends Omit<DynamoDB.PutItemOutput, "Attributes"> {
  Attributes?: "ALL_OLD" | "ALL_NEW" extends ReturnValue
    ? FormatObject<Item, Format>
    : undefined | "NONE" extends ReturnValue
    ? undefined
    : "UPDATED_OLD" | "UPDATED_NEW" extends ReturnValue
    ? Partial<FormatObject<Item, Format>>
    : Partial<FormatObject<Item, Format>>;
}

export type PutCommand<Item extends object, Format extends JsonFormat> = new <
  const ConditionExpression extends string | undefined = undefined,
  const ReturnValue extends DynamoDBReturnValue = "NONE"
>(
  input: PutItemInput<Item, ConditionExpression, ReturnValue, Format>
) => Command<
  PutItemInput<Item, ConditionExpression, ReturnValue, Format>,
  PutItemOutput<Item, ReturnValue, Format> & MetadataBearer,
  DynamoDBClientResolvedConfig
> & {
  _brand: "PutItemCommand";
};

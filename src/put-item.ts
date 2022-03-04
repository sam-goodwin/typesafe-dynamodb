import type { DynamoDB } from "aws-sdk";
import {
  ExpressionAttributeNames,
  ExpressionAttributeValues,
} from "./expression-attributes";
import { FormatObject, JsonFormat } from "./format";

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

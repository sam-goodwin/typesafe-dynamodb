import type { DynamoDB } from "aws-sdk";
import {
  ExpressionAttributeNames,
  ExpressionAttributeValues,
} from "./expression-attributes";
import { FormatObject, JsonFormat } from "./json-format";

export type QueryInput<
  Item extends object,
  KeyConditionExpression extends string | undefined,
  FilterExpression extends string | undefined,
  ProjectionExpression extends string | undefined,
  AttributesToGet extends keyof Item | undefined,
  Format extends JsonFormat
> = Omit<
  DynamoDB.QueryInput,
  | "AttributesToGet"
  | "KeyConditionExpression"
  | "FilterExpression"
  | "ExpressionAttributeNames"
  | "ExpressionAttributeValues"
> &
  ExpressionAttributeNames<KeyConditionExpression> &
  ExpressionAttributeNames<FilterExpression> &
  ExpressionAttributeNames<ProjectionExpression> &
  ExpressionAttributeValues<KeyConditionExpression, Format> &
  ExpressionAttributeValues<FilterExpression, Format> & {
    KeyConditionExpression?: KeyConditionExpression;
    FilterExpression?: FilterExpression;
    ProjectionExpression?: ProjectionExpression;
    AttributesToGet?: AttributesToGet[];
  };

export interface QueryOutput<
  Item extends object,
  AttributesToGet extends keyof Item | undefined,
  Format extends JsonFormat
> extends Omit<DynamoDB.QueryOutput, "Items"> {
  Items?: FormatObject<
    undefined extends AttributesToGet
      ? Item
      : Pick<Item, Extract<AttributesToGet, keyof Item>>,
    Format
  >[];
}

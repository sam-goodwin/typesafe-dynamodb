import type { DynamoDBClientResolvedConfig } from "@aws-sdk/client-dynamodb";
import type { Command } from "@smithy/smithy-client";
import type { MetadataBearer } from "@aws-sdk/types";
import type { DynamoDB } from "aws-sdk";
import type {
  ExpressionAttributeNames,
  ExpressionAttributeValues,
} from "./expression-attributes";
import type { FormatObject, JsonFormat } from "./json-format";

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

export type QueryCommand<Item extends object, Format extends JsonFormat> = new <
  const KeyConditionExpression extends string | undefined,
  const FilterExpression extends string | undefined,
  const ProjectionExpression extends string | undefined,
  const AttributesToGet extends keyof Item | undefined
>(
  input: QueryInput<
    Item,
    KeyConditionExpression,
    FilterExpression,
    ProjectionExpression,
    AttributesToGet,
    Format
  >
) => Command<
  QueryInput<
    Item,
    KeyConditionExpression,
    FilterExpression,
    ProjectionExpression,
    AttributesToGet,
    Format
  >,
  QueryOutput<Item, AttributesToGet, Format> & MetadataBearer,
  DynamoDBClientResolvedConfig
> & {
  _brand: "QueryCommand";
};

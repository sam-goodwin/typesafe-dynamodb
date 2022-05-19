import type { DynamoDB } from "aws-sdk";
import type {
  ExpressionAttributeNames,
  ExpressionAttributeValues,
} from "./expression-attributes";
import type { FormatObject, JsonFormat } from "./json-format";
import type {
  DynamoDBClientResolvedConfig,
  ScanCommand as _ScanCommand,
} from "@aws-sdk/client-dynamodb";
import type { Command } from "@aws-sdk/smithy-client";
import type { MetadataBearer } from "@aws-sdk/types";

export type ScanInput<
  Item extends object,
  FilterExpression extends string | undefined,
  ProjectionExpression extends string | undefined,
  AttributesToGet extends keyof Item | undefined,
  Format extends JsonFormat
> = Omit<
  DynamoDB.ScanInput,
  | "AttributesToGet"
  | "FilterExpression"
  | "ExpressionAttributeNames"
  | "ExpressionAttributeValues"
> &
  ExpressionAttributeNames<FilterExpression> &
  ExpressionAttributeValues<FilterExpression, Format> & {
    FilterExpression?: FilterExpression;
    ProjectionExpression?: ProjectionExpression;
    AttributesToGet?: AttributesToGet[];
  };

export interface ScanOutput<
  Item extends object,
  AttributesToGet extends keyof Item | undefined,
  Format extends JsonFormat
> extends Omit<DynamoDB.ScanOutput, "Items"> {
  Items?: FormatObject<
    undefined extends AttributesToGet
      ? Item
      : Pick<Item, Extract<AttributesToGet, keyof Item>>,
    Format
  >[];
}

export type ScanCommand<Item extends object, Format extends JsonFormat> = new <
  FilterExpression extends string | undefined,
  ProjectionExpression extends string | undefined,
  AttributesToGet extends keyof Item | undefined
>(
  input: ScanInput<
    Item,
    FilterExpression,
    ProjectionExpression,
    AttributesToGet,
    Format
  >
) => Command<
  ScanInput<
    Item,
    FilterExpression,
    ProjectionExpression,
    AttributesToGet,
    Format
  >,
  ScanOutput<Item, AttributesToGet, Format> & MetadataBearer,
  DynamoDBClientResolvedConfig
> & {
  _brand: "ScanCommand";
};

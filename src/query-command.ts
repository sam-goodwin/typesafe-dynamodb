import {
  DynamoDBClientResolvedConfig,
  QueryCommand as _QueryCommand,
} from "@aws-sdk/client-dynamodb";
import type { Command } from "@aws-sdk/smithy-client";
import { QueryInput, QueryOutput } from "./query";
import { MetadataBearer } from "@aws-sdk/types";
import { JsonFormat } from "./json-format";

export function TypeSafeQueryCommand<
  Item extends object,
  Format extends JsonFormat = JsonFormat.Default
>(): new <
  KeyConditionExpression extends string | undefined,
  FilterExpression extends string | undefined,
  ProjectionExpression extends string | undefined,
  AttributesToGet extends keyof Item | undefined
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
} {
  return _QueryCommand as any;
}

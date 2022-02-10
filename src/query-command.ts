import {
  DynamoDBClientResolvedConfig,
  QueryCommand as _QueryCommand,
} from "@aws-sdk/client-dynamodb";
import type { Command } from "@aws-sdk/smithy-client";
import { QueryInput, QueryOutput } from "./query";
import { MetadataBearer } from "@aws-sdk/types";

export function TypeSafeQueryCommand<Item extends object>(): new <
  KeyConditionExpression extends string | undefined,
  FilterExpression extends string | undefined,
  AttributesToGet extends keyof Item | undefined
>(
  input: QueryInput<
    Item,
    KeyConditionExpression,
    FilterExpression,
    AttributesToGet
  >
) => QueryCommand<
  Item,
  KeyConditionExpression,
  FilterExpression,
  AttributesToGet
> {
  return _QueryCommand as any;
}

interface QueryCommand<
  Item extends object,
  KeyConditionExpression extends string | undefined,
  FilterExpression extends string | undefined,
  AttributesToGet extends keyof Item | undefined
> extends Command<
    QueryInput<Item, KeyConditionExpression, FilterExpression, AttributesToGet>,
    QueryOutput<Item, AttributesToGet> & MetadataBearer,
    DynamoDBClientResolvedConfig
  > {
  _brand: "QueryCommand";
}

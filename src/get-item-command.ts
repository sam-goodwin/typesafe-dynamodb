import {
  DynamoDBClientResolvedConfig,
  GetItemCommand as _GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import type { Command } from "@aws-sdk/smithy-client";
import { KeyAttribute } from "./key";
import { GetItemInput, GetItemOutput } from "./get-item";
import { MetadataBearer } from "@aws-sdk/types";

export function TypeSafeGetItemCommand<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined
>(): new <
  Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
  AttributesToGet extends keyof Item | undefined,
  ProjectionExpression extends string | undefined
>(
  input: GetItemInput<
    Item,
    Key,
    PartitionKey,
    RangeKey,
    AttributesToGet,
    ProjectionExpression
  >
) => GetItemCommand<
  Item,
  Key,
  PartitionKey,
  RangeKey,
  AttributesToGet,
  ProjectionExpression
> {
  return _GetItemCommand as any;
}

interface GetItemCommand<
  Item extends object,
  Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  AttributesToGet extends keyof Item | undefined,
  ProjectionExpression extends string | undefined
> extends Command<
    GetItemInput<
      Item,
      Key,
      PartitionKey,
      RangeKey,
      AttributesToGet,
      ProjectionExpression
    >,
    GetItemOutput<Item, Key, AttributesToGet, ProjectionExpression> &
      MetadataBearer,
    DynamoDBClientResolvedConfig
  > {
  _brand: "GetItemCommand";
}

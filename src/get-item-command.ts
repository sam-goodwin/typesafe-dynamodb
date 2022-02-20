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
    PartitionKey,
    RangeKey,
    Key,
    AttributesToGet,
    ProjectionExpression
  >
) => GetItemCommand<
  Item,
  PartitionKey,
  RangeKey,
  Key,
  AttributesToGet,
  ProjectionExpression
> {
  return _GetItemCommand as any;
}

interface GetItemCommand<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
  AttributesToGet extends keyof Item | undefined,
  ProjectionExpression extends string | undefined
> extends Command<
    GetItemInput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      AttributesToGet,
      ProjectionExpression
    >,
    GetItemOutput<Item, Key, AttributesToGet, ProjectionExpression> &
      MetadataBearer,
    DynamoDBClientResolvedConfig
  > {
  _brand: "GetItemCommand";
}

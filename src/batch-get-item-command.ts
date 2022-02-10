import {
  BatchGetItemCommand as _BatchGetItemCommand,
  DynamoDBClientResolvedConfig,
} from "@aws-sdk/client-dynamodb";
import type { Command } from "@aws-sdk/smithy-client";
import { MetadataBearer } from "@aws-sdk/types";
import { BatchGetItemInput, BatchGetItemOutput } from "./batch-get-item";
import { KeyAttribute } from "./key";

export function TypeSafeBatchGetItemCommand<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined
>(): new <
  Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
  AttributesToGet extends keyof Item | undefined,
  ProjectionExpression extends string | undefined
>(
  input: BatchGetItemInput<
    Item,
    Key,
    PartitionKey,
    RangeKey,
    AttributesToGet,
    ProjectionExpression
  >
) => BatchGetItemCommand<
  Item,
  Key,
  PartitionKey,
  RangeKey,
  AttributesToGet,
  ProjectionExpression
> {
  return _BatchGetItemCommand as any;
}

export interface BatchGetItemCommand<
  Item extends object,
  Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  AttributesToGet extends keyof Item | undefined,
  ProjectionExpression extends string | undefined
> extends Command<
    BatchGetItemInput<
      Item,
      Key,
      PartitionKey,
      RangeKey,
      AttributesToGet,
      ProjectionExpression
    >,
    BatchGetItemOutput<Item, Key, AttributesToGet, ProjectionExpression> &
      MetadataBearer,
    DynamoDBClientResolvedConfig
  > {
  _brand: "BatchGetItemCommand";
}

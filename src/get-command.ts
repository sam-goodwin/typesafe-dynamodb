import {
  DynamoDBClientResolvedConfig,
  GetItemCommand as _GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import type { Command } from "@aws-sdk/smithy-client";
import { TableKey } from "./key";
import { GetItemInput, GetItemOutput } from "./get-item";
import { MetadataBearer } from "@aws-sdk/types";
import { JsonFormat } from "./json-format";

export type GetCommand<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  Format extends JsonFormat
> = new <
  Key extends TableKey<Item, PartitionKey, RangeKey, Format>,
  AttributesToGet extends keyof Item | undefined,
  ProjectionExpression extends string | undefined
>(
  input: GetItemInput<
    Item,
    PartitionKey,
    RangeKey,
    Key,
    AttributesToGet,
    ProjectionExpression,
    Format
  >
) => Command<
  GetItemInput<
    Item,
    PartitionKey,
    RangeKey,
    Key,
    AttributesToGet,
    ProjectionExpression,
    Format
  >,
  GetItemOutput<
    Item,
    PartitionKey,
    RangeKey,
    Key,
    AttributesToGet,
    ProjectionExpression,
    Format
  > &
    MetadataBearer,
  DynamoDBClientResolvedConfig
> & {
  _brand: "GetItemCommand";
};

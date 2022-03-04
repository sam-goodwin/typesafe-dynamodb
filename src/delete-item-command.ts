import {
  DynamoDBClientResolvedConfig,
  DeleteItemCommand as _DeleteItemCommand,
  ReturnValue as DynamoDBReturnValue,
} from "@aws-sdk/client-dynamodb";
import type { Command } from "@aws-sdk/smithy-client";
import { DeleteItemInput, DeleteItemOutput } from "./delete-item";
import { MetadataBearer } from "@aws-sdk/types";
import { TableKey } from "./key";
import { JsonFormat } from "./json-format";

export interface DeleteItemCommand<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  Key extends TableKey<Item, PartitionKey, RangeKey, Format>,
  ConditionExpression extends string | undefined,
  ReturnValue extends DynamoDBReturnValue,
  Format extends JsonFormat
> extends Command<
    DeleteItemInput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      ConditionExpression,
      ReturnValue,
      Format
    >,
    DeleteItemOutput<Item, ReturnValue, Format> & MetadataBearer,
    DynamoDBClientResolvedConfig
  > {
  _brand: "DeleteItemCommand";
}

export function TypeSafeDeleteItemCommand<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  Format extends JsonFormat = JsonFormat.Default
>(): new <
  Key extends TableKey<Item, PartitionKey, RangeKey, Format>,
  ConditionExpression extends string | undefined = undefined,
  ReturnValue extends DynamoDBReturnValue = "NONE"
>(
  input: DeleteItemInput<
    Item,
    PartitionKey,
    RangeKey,
    Key,
    ConditionExpression,
    ReturnValue,
    Format
  >
) => DeleteItemCommand<
  Item,
  PartitionKey,
  RangeKey,
  Key,
  ConditionExpression,
  ReturnValue,
  Format
> {
  return _DeleteItemCommand as any;
}

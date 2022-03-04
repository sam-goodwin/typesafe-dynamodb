import {
  DynamoDBClientResolvedConfig,
  UpdateItemCommand as _UpdateItemCommand,
  ReturnValue as DynamoDBReturnValue,
} from "@aws-sdk/client-dynamodb";
import type { Command } from "@aws-sdk/smithy-client";
import { UpdateItemInput, UpdateItemOutput } from "./update-item";
import { MetadataBearer } from "@aws-sdk/types";
import { TableKey } from "./key";
import { JsonFormat } from "./format";

export interface UpdateItemCommand<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  Key extends TableKey<Item, PartitionKey, RangeKey, Format>,
  UpdateExpression extends string,
  ConditionExpression extends string | undefined,
  ReturnValue extends DynamoDBReturnValue = "NONE",
  Format extends JsonFormat = JsonFormat.Default
> extends Command<
    UpdateItemInput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      UpdateExpression,
      ConditionExpression,
      ReturnValue,
      Format
    >,
    UpdateItemOutput<Item, PartitionKey, RangeKey, Key, ReturnValue, Format> &
      MetadataBearer,
    DynamoDBClientResolvedConfig
  > {
  _brand: "UpdateItemCommand";
}

export function TypeSafeUpdateItemCommand<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  Format extends JsonFormat = JsonFormat.Default
>(): new <
  Key extends TableKey<Item, PartitionKey, RangeKey, Format>,
  UpdateExpression extends string,
  ConditionExpression extends string | undefined = undefined,
  ReturnValue extends DynamoDBReturnValue = "NONE"
>(
  input: UpdateItemInput<
    Item,
    PartitionKey,
    RangeKey,
    Key,
    UpdateExpression,
    ConditionExpression,
    ReturnValue,
    Format
  >
) => UpdateItemCommand<
  Item,
  PartitionKey,
  RangeKey,
  Key,
  UpdateExpression,
  ConditionExpression,
  ReturnValue,
  Format
> {
  return _UpdateItemCommand as any;
}

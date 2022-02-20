import {
  DynamoDBClientResolvedConfig,
  UpdateItemCommand as _UpdateItemCommand,
  ReturnValue as DynamoDBReturnValue,
} from "@aws-sdk/client-dynamodb";
import type { Command } from "@aws-sdk/smithy-client";
import { UpdateItemInput, UpdateItemOutput } from "./update-item";
import { MetadataBearer } from "@aws-sdk/types";
import { KeyAttribute } from "./key";

export interface UpdateItemCommand<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
  UpdateExpression extends string,
  ConditionExpression extends string | undefined,
  ReturnValue extends DynamoDBReturnValue = "NONE"
> extends Command<
    UpdateItemInput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      UpdateExpression,
      ConditionExpression,
      ReturnValue
    >,
    UpdateItemOutput<Item, PartitionKey, RangeKey, Key, ReturnValue> &
      MetadataBearer,
    DynamoDBClientResolvedConfig
  > {
  _brand: "UpdateItemCommand";
}

export function TypeSafeUpdateItemCommand<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined
>(): new <
  Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
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
    ReturnValue
  >
) => UpdateItemCommand<
  Item,
  PartitionKey,
  RangeKey,
  Key,
  UpdateExpression,
  ConditionExpression,
  ReturnValue
> {
  return _UpdateItemCommand as any;
}

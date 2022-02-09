import {
  DynamoDBClientResolvedConfig,
  DeleteItemCommand as _DeleteItemCommand,
  ReturnValue as DynamoDBReturnValue,
} from "@aws-sdk/client-dynamodb";
import type { Command } from "@aws-sdk/smithy-client";
import { DeleteItemInput, DeleteItemOutput } from "./delete-item";
import { MetadataBearer } from "@aws-sdk/types";
import { KeyAttribute } from "./key";

export interface DeleteItemCommand<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
  ConditionExpression extends string | undefined,
  ReturnValue extends DynamoDBReturnValue = "NONE"
> extends Command<
    DeleteItemInput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      ConditionExpression,
      ReturnValue
    >,
    DeleteItemOutput<Item, ReturnValue> & MetadataBearer,
    DynamoDBClientResolvedConfig
  > {
  _brand: "DeleteItemCommand";
}

export function TypeSafeDeleteItemCommand<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined
>(): new <
  Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
  ConditionExpression extends string | undefined = undefined,
  ReturnValue extends DynamoDBReturnValue = "NONE"
>(
  input: DeleteItemInput<
    Item,
    PartitionKey,
    RangeKey,
    Key,
    ConditionExpression,
    ReturnValue
  >
) => DeleteItemCommand<
  Item,
  PartitionKey,
  RangeKey,
  Key,
  ConditionExpression,
  ReturnValue
> {
  return _DeleteItemCommand as any;
}

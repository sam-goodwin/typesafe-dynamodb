import {
  DynamoDBClientResolvedConfig,
  PutItemCommand as _PutItemCommand,
  ReturnValue as DynamoDBReturnValue,
} from "@aws-sdk/client-dynamodb";
import type { Command } from "@aws-sdk/smithy-client";
import { PutItemInput, PutItemOutput } from "./put-item";
import { MetadataBearer } from "@aws-sdk/types";

export interface PutItemCommand<
  Item extends object,
  ConditionExpression extends string | undefined,
  ReturnValue extends DynamoDBReturnValue = "NONE"
> extends Command<
    PutItemInput<Item, ConditionExpression, ReturnValue>,
    PutItemOutput<Item, ReturnValue> & MetadataBearer,
    DynamoDBClientResolvedConfig
  > {
  _brand: "PutItemCommand";
}

export function TypeSafePutItemCommand<Item extends object>(): new <
  ConditionExpression extends string | undefined = undefined,
  ReturnValue extends DynamoDBReturnValue = "NONE"
>(
  input: PutItemInput<Item, ConditionExpression, ReturnValue>
) => PutItemCommand<Item, ConditionExpression, ReturnValue> {
  return _PutItemCommand as any;
}

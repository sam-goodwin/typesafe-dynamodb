import {
  DynamoDBClientResolvedConfig,
  PutItemCommand as _PutItemCommand,
  ReturnValue as DynamoDBReturnValue,
} from "@aws-sdk/client-dynamodb";
import type { Command } from "@aws-sdk/smithy-client";
import { PutItemInput, PutItemOutput } from "./put-item";
import { MetadataBearer } from "@aws-sdk/types";
import { JsonFormat } from "./json-format";

export interface PutItemCommand<
  Item extends object,
  ConditionExpression extends string | undefined,
  ReturnValue extends DynamoDBReturnValue,
  Format extends JsonFormat
> extends Command<
    PutItemInput<Item, ConditionExpression, ReturnValue, Format>,
    PutItemOutput<Item, ReturnValue, Format> & MetadataBearer,
    DynamoDBClientResolvedConfig
  > {
  _brand: "PutItemCommand";
}

export function TypeSafePutItemCommand<
  Item extends object,
  Format extends JsonFormat = JsonFormat.Default
>(): new <
  ConditionExpression extends string | undefined = undefined,
  ReturnValue extends DynamoDBReturnValue = "NONE"
>(
  input: PutItemInput<Item, ConditionExpression, ReturnValue, Format>
) => PutItemCommand<Item, ConditionExpression, ReturnValue, Format> {
  return _PutItemCommand as any;
}

import { QueryCommand as _QueryCommand } from "@aws-sdk/client-dynamodb";
import { QueryCommand } from "./query";
import { JsonFormat } from "./json-format";

export function TypeSafeQueryCommand<Item extends object>(): QueryCommand<
  Item,
  JsonFormat.AttributeValue
> {
  return _QueryCommand as any;
}

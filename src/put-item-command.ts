import { PutItemCommand as _PutItemCommand } from "@aws-sdk/client-dynamodb";
import type { JsonFormat } from "./json-format";
import type { PutCommand } from "./put-item";

export function TypeSafePutItemCommand<Item extends object>(): PutCommand<
  Item,
  JsonFormat.AttributeValue
> {
  return _PutItemCommand as any;
}

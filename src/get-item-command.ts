import { GetCommand as _GetCommand } from "@aws-sdk/lib-dynamodb";
import type { JsonFormat } from "./json-format";
import type { GetCommand } from "./get-command";

export function TypeSafeGetItemCommand<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined
>(): GetCommand<Item, PartitionKey, RangeKey, JsonFormat.AttributeValue> {
  return _GetCommand as any;
}

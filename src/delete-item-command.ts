import { DeleteItemCommand as _DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import type { DeleteCommand } from "./delete-item";
import type { JsonFormat } from "./json-format";

export function TypeSafeDeleteItemCommand<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined
>(): DeleteCommand<Item, PartitionKey, RangeKey, JsonFormat.AttributeValue> {
  return _DeleteItemCommand as any;
}

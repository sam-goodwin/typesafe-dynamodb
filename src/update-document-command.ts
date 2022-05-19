import { UpdateCommand as _UpdateCommand } from "@aws-sdk/lib-dynamodb";
import type { UpdateCommand } from "./update-item";
import type { JsonFormat } from "./json-format";

export function TypeSafeUpdateDocumentCommand<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined
>(): UpdateCommand<Item, PartitionKey, RangeKey, JsonFormat.Document> {
  return _UpdateCommand as any;
}

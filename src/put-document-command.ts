import { PutCommand as _PutCommand } from "@aws-sdk/lib-dynamodb";
import type { JsonFormat } from "./json-format";
import type { PutCommand } from "./put-item";

export function TypeSafePutDocumentCommand<Item extends object>(): PutCommand<
  Item,
  JsonFormat.Document
> {
  return _PutCommand as any;
}

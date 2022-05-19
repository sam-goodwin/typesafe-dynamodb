import { ScanCommand as _ScanCommand } from "@aws-sdk/client-dynamodb";
import type { JsonFormat } from "./json-format";
import type { ScanCommand } from "./scan";

export function TypeSafeScanDocumentCommand<Item extends object>(): ScanCommand<
  Item,
  JsonFormat.Document
> {
  return _ScanCommand as any;
}

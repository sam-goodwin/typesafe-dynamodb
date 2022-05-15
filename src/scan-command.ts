import { ScanCommand as _ScanCommand } from "@aws-sdk/client-dynamodb";
import type { ScanCommand } from "./scan";
import type { JsonFormat } from "./json-format";

export function TypeSafeScanCommand<Item extends object>(): ScanCommand<
  Item,
  JsonFormat.AttributeValue
> {
  return _ScanCommand as any;
}

import { GetCommand as _GetCommand } from "@aws-sdk/lib-dynamodb";
import { z } from "zod";
import type { GetCommand } from "./get-command";
import type { JsonFormat } from "./json-format";

export function SchemaValidatedGetDocumentCommand<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
>(
  schema: z.ZodSchema<Item>,
): GetCommand<Item, PartitionKey, RangeKey, JsonFormat.Document> & {
  _schema: z.ZodSchema<Item>;
} {
  const Command = _GetCommand as any;
  Command._schema = schema;
  return Command;
}

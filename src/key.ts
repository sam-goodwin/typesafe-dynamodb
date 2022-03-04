import { B, N, S } from "./attribute-value";
import { JsonFormat, FormatObject } from "./format";

export type TableKey<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  Format extends JsonFormat
> = FormatObject<
  Pick<Item, Exclude<PartitionKey | RangeKey, undefined>>,
  Format
>;

export type TableKeyAttributeToObject<
  Key extends TableKey<any, any, any, JsonFormat.Document>
> = {
  [attrName in keyof Key]: Key[attrName] extends S<infer s>
    ? s
    : Key[attrName] extends N<infer n>
    ? n
    : Key[attrName] extends B
    ? Buffer | string
    : never;
};

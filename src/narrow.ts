import { JsonFormat } from "./format";
import { TableKey, TableKeyAttributeToObject } from "./key";

export type Narrow<
  Item extends object,
  Key extends TableKey<Item, any, any, Format>,
  Format extends JsonFormat
> = Extract<
  Item,
  Format extends JsonFormat.AttributeValue
    ? TableKeyAttributeToObject<Key>
    : Key
>;

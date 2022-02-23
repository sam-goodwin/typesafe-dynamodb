import { KeyAttribute, KeyAttributeToObject } from "./key";

export type Narrow<
  Item extends object,
  Key extends KeyAttribute<Item, any, any>
> = Extract<Item, KeyAttributeToObject<Item, Key>>;

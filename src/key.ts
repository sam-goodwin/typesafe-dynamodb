import { B, M, N, S, ToAttributeValue } from "./attribute-value";

export type Key<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined
> = Pick<Item, Exclude<PartitionKey | RangeKey, undefined>>;

export type KeyAttribute<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined
> = Extract<ToAttributeValue<Key<Item, PartitionKey, RangeKey>>, M>["M"];

export type KeyAttributeToObject<
  Item extends object,
  Key extends KeyAttribute<Item, keyof Item, keyof Item | undefined>
> = {
  [attrName in keyof Key]: Key[attrName] extends S<infer s>
    ? s
    : Key[attrName] extends N<infer n>
    ? n
    : Key[attrName] extends B
    ? Buffer | string
    : never;
};

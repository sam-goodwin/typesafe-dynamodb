import { M, ToAttributeValue } from "./attribute-value";

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

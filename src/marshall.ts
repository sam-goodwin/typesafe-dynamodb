import {
  marshallOptions,
  unmarshallOptions,
  marshall as _marshall,
  unmarshall as _unmarshall,
} from "@aws-sdk/util-dynamodb";
import {
  AttributeMap,
  B,
  L,
  M,
  N,
  NativeBinaryAttribute,
  S,
  ToAttributeMap,
} from "./attribute-value";

export const marshall: <
  Item extends object,
  MarshallOptions extends marshallOptions | undefined
>(
  item: Item,
  options?: MarshallOptions
) => ToAttributeMap<Item> = _marshall;

export const unmarshall: <
  Item extends AttributeMap,
  UnmarshallOptions extends unmarshallOptions | undefined
>(
  item: Item,
  options?: UnmarshallOptions
) => Unmarshall<Item, UnmarshallOptions> = _unmarshall as any;

export type Unmarshall<
  Attributes extends AttributeMap,
  Options extends unmarshallOptions | undefined
> = {
  [prop in keyof Attributes]: UnmarshallValue<Attributes[prop], Options>;
};

export interface NumberValue<N extends number> {
  value: `${N}`;
}

export type UnmarshallValue<
  T,
  Options extends unmarshallOptions | undefined
> = T extends S<infer s>
  ? s
  : T extends B
  ? NativeBinaryAttribute
  : T extends N<infer n>
  ? Exclude<Options, undefined>["wrapNumbers"] extends true
    ? NumberValue<n>
    : n
  : T extends Date
  ? string
  : T extends L<infer Items>
  ? {
      [i in keyof Items]: i extends "length"
        ? Items[i]
        : UnmarshallValue<Items[i], Options>;
    }
  : T extends M<infer Attributes>
  ? Unmarshall<Attributes, Options>
  : never;

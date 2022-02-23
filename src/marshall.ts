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
) => {
  [prop in keyof Item]: Unmarshall<Item[prop], UnmarshallOptions>;
} = _unmarshall as any;

export interface NumberValue<N extends number> {
  value: `${N}`;
}

export type Unmarshall<
  T,
  UnmarshallOptions extends unmarshallOptions | undefined
> = T extends S<infer s>
  ? s
  : T extends B
  ? NativeBinaryAttribute
  : T extends N<infer n>
  ? Exclude<UnmarshallOptions, undefined>["wrapNumbers"] extends true
    ? NumberValue<n>
    : n
  : T extends Date
  ? string
  : T extends L<infer Items>
  ? {
      [i in keyof Items]: i extends "length"
        ? Items[i]
        : Unmarshall<Items[i], UnmarshallOptions>;
    }
  : T extends M<infer Attributes>
  ? {
      [prop in keyof Attributes]: Unmarshall<
        Attributes[prop],
        UnmarshallOptions
      >;
    }
  : never;

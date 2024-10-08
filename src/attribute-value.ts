export type AttributeValue =
  | undefined
  | S
  | N
  | B
  | BOOL
  | NULL
  | L<ArrayLike<AttributeValue>>
  | M<Record<string, AttributeValue>>;

export type AttributeMap = Record<string, AttributeValue>;

export type NativeBinaryAttribute =
  | ArrayBuffer
  | BigInt64Array
  | BigUint64Array
  | Buffer
  | DataView
  | Float32Array
  | Float64Array
  | Int16Array
  | Int32Array
  | Int8Array
  | Uint16Array
  | Uint32Array
  | Uint8Array
  | Uint8ClampedArray;

export type DocumentValue =
  | undefined
  | null
  | boolean
  | number
  | string
  | DocumentValue[]
  | NativeBinaryAttribute
  | {
      [key: string]: DocumentValue;
    };

// @ts-ignore
export type ToAttributeMap<T extends object> = ToAttributeValue<T>["M"];

/**
 * Computes the JSON representation of an object, {@link T}.
 */
export type ToAttributeValue<T> = T extends undefined
  ? undefined
  : T extends null
  ? NULL
  : T extends boolean
  ? BOOL<T>
  : T extends string
  ? S<T>
  : T extends number
  ? N<T>
  : // this behavior is not defined by https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
  // should it be a number of string?
  T extends Date
  ? N<number>
  : T extends NativeBinaryAttribute
  ? B
  : T extends ArrayLike<unknown>
  ? L<{
      [i in keyof T]: i extends "length" ? T[i] : ToAttributeValue<T[i]>;
    }>
  : M<{
      [prop in keyof T]: ToAttributeValue<T[prop]>;
    }>;

export function isS(a: any): a is S {
  return a !== undefined && "S" in a;
}

export interface S<S extends string = string> {
  S: S;
}

export function isB(a: any): a is B {
  return a !== undefined && "B" in a;
}

export interface B {
  B: Buffer;
}

export function isBOOL(a: any): a is BOOL {
  return a !== undefined && "BOOL" in a;
}

export interface BOOL<B = boolean> {
  BOOL: B;
}

export function isM(a: any): a is M {
  return a !== undefined && "M" in a;
}

export interface M<
  M extends Record<string, AttributeValue> = Record<string, AttributeValue>
> {
  M: M;
}

export function isN(a: any): a is N {
  return a !== undefined && "N" in a;
}

export interface N<N extends number = number> {
  N: `${N}`;
}

export function isNULL(a: any): a is NULL {
  return a !== undefined && "NULL" in a;
}

export interface NULL {
  NULL: boolean;
}

export function isL(a: any): a is L {
  return a !== undefined && "L" in a;
}

export interface L<
  L extends ArrayLike<AttributeValue> = ArrayLike<AttributeValue>
> {
  L: L;
}

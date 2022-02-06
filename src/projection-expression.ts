import { AlphaNumeric } from "./letter";

export type ProjectionExpr =
  | ArrayIndex
  | Identifier
  | NumberLiteral
  | NameRef
  | PropRef
  | ValueRef;
//

export interface NameRef<Name extends string = string> {
  kind: "name-ref";
  name: Name;
}
export interface ValueRef<Name extends string = string> {
  kind: "value-ref";
  name: Name;
}
export interface Identifier<I extends string = string> {
  kind: "identifier";
  name: I;
}

export interface NumberLiteral<N extends string = string> {
  kind: "index";
  number: N;
}
export interface PropRef<
  Expr extends ProjectionExpr = any,
  Id extends Identifier = any
> {
  kind: "prop-ref";
  expr: Expr;
  name: Id;
}
export interface ArrayIndex<
  List extends ProjectionExpr = any,
  Number extends NumberLiteral | ValueRef = NumberLiteral | ValueRef
> {
  kind: "array-index";
  list: List;
  number: Number;
}

export type ParseProjectionExpression<Text extends string> = Parse<
  Text,
  [],
  undefined
>;

type AsExpr<T> = Extract<T, ProjectionExpr>;

type Parse<
  Text extends string,
  Expressions extends ProjectionExpr[],
  Expr extends ProjectionExpr | undefined
> = Text extends `.${infer Rest}`
  ? Expr extends ProjectionExpr
    ? Parse<Rest, Expressions, PropRef<Expr, Identifier<"">>>
    : never
  : Text extends `[:${infer Rest}`
  ? Parse<Rest, Expressions, ArrayIndex<AsExpr<Expr>, ValueRef<"">>>
  : Text extends `[${infer Rest}`
  ? Parse<Rest, Expressions, ArrayIndex<AsExpr<Expr>, NumberLiteral<"">>>
  : Text extends `]${infer Rest}`
  ? Parse<Rest, Expressions, Expr>
  : Text extends `]`
  ? Concat<Expressions, Expr>
  : Text extends `${"," | " "}${infer Rest}`
  ? Parse<Rest, Concat<Expressions, Expr>, undefined>
  : Text extends `#${infer Rest}`
  ? Parse<Rest, Concat<Expressions, Expr>, NameRef<Rest>>
  : Text extends `:${infer Rest}`
  ? Parse<Rest, Concat<Expressions, Expr>, ValueRef<Rest>>
  : Text extends `${AlphaNumeric}${string}`
  ? Text extends `${infer char}${infer Rest}`
    ? Parse<Rest, Expressions, Append<Expr, char>>
    : never
  : Text extends `${AlphaNumeric}${string}`
  ? Text extends `${infer char}${infer Rest}`
    ? Parse<Rest, Expressions, Append<Expr, char>>
    : never
  : Concat<Expressions, Expr>;

type Concat<
  Expressions extends ProjectionExpr[],
  CurrentExpr extends ProjectionExpr | undefined
> = undefined extends CurrentExpr
  ? Expressions
  : [...Expressions, Extract<CurrentExpr, ProjectionExpr>];

type Append<
  Expr extends ProjectionExpr | undefined,
  char extends string
> = Expr extends undefined
  ? Identifier<char>
  : Expr extends Identifier<infer Name>
  ? Identifier<`${Name}${char}`>
  : Expr extends NumberLiteral<infer Name>
  ? NumberLiteral<`${Name}${char}`>
  : Expr extends NameRef<infer Name>
  ? NameRef<`${Name}${char}`>
  : Expr extends ValueRef<infer Name>
  ? ValueRef<`${Name}${char}`>
  : Expr extends PropRef<infer expr, infer name>
  ? PropRef<expr, Extract<Append<name, char>, Identifier>>
  : Expr extends ArrayIndex<infer expr, infer idx>
  ? ArrayIndex<expr, Extract<Append<idx, char>, NumberLiteral>>
  : never;

export type ApplyProjection<T, Expr extends string> = Flatten<
  UnionToIntersection<
    ApplyProjectionExpr<T, ParseProjectionExpression<Expr>[number]>
  >
>;

type ApplyProjectionExpr<T, Expr extends ProjectionExpr> = T extends undefined
  ? never
  : Expr extends PropRef<infer expr, infer i>
  ? {
      [p in keyof ApplyProjectionExpr<T, expr>]: ApplyProjectionExpr<
        ApplyProjectionExpr<T, expr>[p],
        i
      >;
    }
  : Expr extends ArrayIndex<infer expr, infer i>
  ? {
      [p in keyof ApplyProjectionExpr<T, expr>]: ApplyProjectionExpr<
        ApplyProjectionExpr<T, expr>[keyof ApplyProjectionExpr<T, expr>],
        i
      >;
    }
  : Expr extends Identifier<infer I>
  ? I extends keyof T
    ? Pick<T, I>
    : never
  : Expr extends NumberLiteral<infer I>
  ? ParseInt<I> extends keyof T
    ? Pick<T, ParseInt<I>>
    : never
  : never;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type Flatten<T> = T extends object
  ? keyof T extends number
    ? FlattenArray<Extract<T, Record<number, any>>>
    : {
        [k in keyof T]: Flatten<T[k]>;
      }
  : T;

type FlattenArray<
  T extends { [i in number]: any },
  i extends number = 0
> = i extends keyof T
  ? [T[i], ...FlattenArray<T, Inc<i>>]
  : number extends i
  ? []
  : FlattenArray<T, Inc<i>>;

type Inc<N extends number> = N extends 0
  ? 1
  : N extends 1
  ? 2
  : N extends 2
  ? 3
  : N extends 3
  ? 4
  : N extends 4
  ? 5
  : N extends 5
  ? 6
  : N extends 6
  ? 7
  : number;

type ParseInt<N extends string> = N extends "0"
  ? 0
  : N extends "1"
  ? 1
  : N extends "2"
  ? 2
  : N extends "3"
  ? 3
  : N extends "4"
  ? 4
  : N extends "5"
  ? 5
  : N extends "6"
  ? 6
  : N extends "7"
  ? 7
  : N extends "8"
  ? 8
  : N extends "9"
  ? 9
  : number;

import { AttributeValue, DocumentValue } from "./attribute-value";
import { JsonFormat } from "./format";
import { AlphaNumeric } from "./letter";

export type ExpressionAttributeValues<
  Expression extends string | undefined,
  Format extends JsonFormat
> = undefined extends Expression
  ? {}
  : ParseConditionExpressionValues<Expression> extends never
  ? {}
  : {
      ExpressionAttributeValues: {
        [name in ParseConditionExpressionValues<Expression> as `:${name}`]: Format extends JsonFormat.AttributeValue
          ? AttributeValue
          : DocumentValue;
      };
    };

export type ExpressionAttributeNames<Expression extends string | undefined> =
  undefined extends Expression
    ? {}
    : ParseConditionExpressionNames<Expression> extends never
    ? {}
    : {
        ExpressionAttributeNames: {
          [name in ParseConditionExpressionNames<Expression> as `#${name}`]: string;
        };
      };

type ParseConditionExpressionNames<Str extends string | undefined> = Extract<
  ParsePrefixedString<"#", Str>,
  string
>;

type ParseConditionExpressionValues<Str extends string | undefined> = Extract<
  ParsePrefixedString<":", Str>,
  string
>;

type ParsePrefixedString<
  Prefix extends string,
  Str extends string | undefined = undefined,
  Names extends string | undefined = undefined
> = undefined | "" extends Str
  ? Names
  : Str extends `${Prefix}${infer Tail}`
  ? // it is a name
    ParsePrefixedString<
      Prefix,
      Skip<Tail, AlphaNumeric>,
      undefined extends Names
        ? Read<Tail, AlphaNumeric>
        : Names | Read<Tail, AlphaNumeric>
    >
  : Str extends `${string}${infer Tail}`
  ? ParsePrefixedString<Prefix, Tail, Names>
  : Names;

type Skip<
  S extends string,
  Char extends string | number
> = S extends `${Char}${infer Tail}`
  ? Skip<Tail, Char>
  : S extends `${Char}`
  ? ""
  : S;

// type a = Read<"abc", "a" | "b">;

type Read<
  S extends string,
  Char extends string | number,
  Accum extends string = ""
> = S extends `${infer C}${infer rest}`
  ? C extends Char
    ? Read<rest, Char, `${Accum}${C}`>
    : Accum
  : Accum;

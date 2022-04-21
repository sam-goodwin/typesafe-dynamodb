import { AttributeValue, DocumentValue } from "./attribute-value";
import { JsonFormat } from "./json-format";
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
  ParsePrefixedString<"#", Split<Str>>,
  string
>;

type ParseConditionExpressionValues<Str extends string | undefined> = Extract<
  ParsePrefixedString<":", Split<Str>>,
  string
>;

// long expressions can easily reach the 50 depth limit
// to work around this, Split will partition the string by the `,` delimiter.
// the reason for `,` is because update expressions are separated by `,`
// This means that we can support strings longer than 50.
// The 50 max depth limit now only applies to the length of strings between commas, `,`.
// @see https://github.com/sam-goodwin/typesafe-dynamodb/issues/29
type Split<S extends string | undefined> =
  S extends `${infer pre},${infer post}`
    ? pre | Split<post>
    : S extends undefined
    ? ""
    : S;

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

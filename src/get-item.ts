import type { DynamoDB } from "aws-sdk";
import { JsonFormat, FormatObject } from "./json-format";
import { TableKey } from "./key";
import { Narrow } from "./narrow";
import { ApplyProjection } from "./projection";
import { Simplify } from "./simplify";

export interface GetItemInput<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  Key extends TableKey<Item, PartitionKey, RangeKey, Format>,
  AttributesToGet extends keyof Item | undefined,
  ProjectionExpression extends string | undefined,
  Format extends JsonFormat
> extends Omit<
    DynamoDB.GetItemInput,
    "Key" | "AttributesToGet" | "ProjectionExpression"
  > {
  Key: Key;
  AttributesToGet?: readonly AttributesToGet[] | AttributesToGet[];
  ProjectionExpression?: ProjectionExpression;
}

export interface GetItemOutput<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  Key extends TableKey<Item, PartitionKey, RangeKey, Format>,
  AttributesToGet extends keyof Item | undefined,
  ProjectionExpression extends string | undefined,
  Format extends JsonFormat = JsonFormat.AttributeValue
> extends Omit<DynamoDB.GetItemOutput, "Item"> {
  Item?: Simplify<
    FormatObject<
      undefined extends AttributesToGet
        ? undefined extends ProjectionExpression
          ? Narrow<Item, Extract<Key, TableKey<Item, any, any, Format>>, Format>
          : Extract<
              ApplyProjection<
                Narrow<
                  Item,
                  Extract<Key, TableKey<Item, any, any, Format>>,
                  Format
                >,
                Extract<ProjectionExpression, string>
              >,
              object
            >
        : Pick<
            Narrow<
              Item,
              Extract<Key, TableKey<Item, any, any, Format>>,
              Format
            >,
            Extract<AttributesToGet, keyof Item>
          >,
      Format
    >
  >;
}

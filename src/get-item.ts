import type { DynamoDB } from "aws-sdk";
import { JsonFormat, FormatObject } from "./format";
import { TableKey } from "./key";
import { Narrow } from "./narrow";
import { ApplyProjection } from "./projection";

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
  Item?: FormatObject<
    undefined extends AttributesToGet
      ? undefined extends ProjectionExpression
        ? Narrow<Item, Key, Format>
        : Extract<
            ApplyProjection<
              Narrow<Item, Key, Format>,
              Extract<ProjectionExpression, string>
            >,
            object
          >
      : Pick<Narrow<Item, Key, Format>, Extract<AttributesToGet, keyof Item>>,
    Format
  >;
}

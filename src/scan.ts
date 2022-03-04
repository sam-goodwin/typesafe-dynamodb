import type { DynamoDB } from "aws-sdk";
import {
  ExpressionAttributeNames,
  ExpressionAttributeValues,
} from "./expression-attributes";
import { FormatObject, JsonFormat } from "./format";

export type ScanInput<
  Item extends object,
  FilterExpression extends string | undefined,
  ProjectionExpression extends string | undefined,
  AttributesToGet extends keyof Item | undefined,
  Format extends JsonFormat
> = Omit<
  DynamoDB.ScanInput,
  | "AttributesToGet"
  | "FilterExpression"
  | "ExpressionAttributeNames"
  | "ExpressionAttributeValues"
> &
  ExpressionAttributeNames<FilterExpression> &
  ExpressionAttributeValues<FilterExpression, Format> & {
    FilterExpression?: FilterExpression;
    ProjectionExpression?: ProjectionExpression;
    AttributesToGet?: AttributesToGet[];
  };

export interface ScanOutput<
  Item extends object,
  AttributesToGet extends keyof Item | undefined,
  Format extends JsonFormat
> extends Omit<DynamoDB.ScanOutput, "Items"> {
  Items?: FormatObject<
    undefined extends AttributesToGet
      ? Item
      : Pick<Item, Extract<AttributesToGet, keyof Item>>,
    Format
  >[];
}

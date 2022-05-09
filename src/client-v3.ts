import type {
  DynamoDB,
  ReturnValue as DynamoDBReturnValue,
} from "@aws-sdk/client-dynamodb";
import { MetadataBearer } from "@aws-sdk/types";
import { ProjectionExpression } from "aws-sdk/clients/dynamodb";
import { Callback } from "./callback";
import { DeleteItemInput, DeleteItemOutput } from "./delete-item";
import { JsonFormat } from "./json-format";
import { GetItemInput, GetItemOutput } from "./get-item";
import { TableKey } from "./key";
import { PutItemInput, PutItemOutput } from "./put-item";
import { QueryInput, QueryOutput } from "./query";
import { ScanInput, ScanOutput } from "./scan";
import { UpdateItemInput, UpdateItemOutput } from "./update-item";

export interface TypeSafeDynamoDBv3<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined = undefined
> extends Omit<
    DynamoDB,
    "getItem" | "deleteItem" | "putItem" | "updateItem" | "query" | "scan"
  > {
  getItem<
    Key extends TableKey<
      Item,
      PartitionKey,
      RangeKey,
      JsonFormat.AttributeValue
    >,
    AttributesToGet extends keyof Item | undefined = undefined,
    ProjectionExpression extends string | undefined = undefined
  >(
    params: GetItemInput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      AttributesToGet,
      ProjectionExpression,
      JsonFormat.AttributeValue
    >
  ): Promise<
    GetItemOutput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      AttributesToGet,
      ProjectionExpression,
      JsonFormat.AttributeValue
    > &
      MetadataBearer
  >;

  getItem<
    Key extends TableKey<
      Item,
      PartitionKey,
      RangeKey,
      JsonFormat.AttributeValue
    >,
    AttributesToGet extends keyof Item | undefined = undefined,
    ProjectionExpression extends string | undefined = undefined
  >(
    params: GetItemInput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      AttributesToGet,
      ProjectionExpression,
      JsonFormat.AttributeValue
    >,
    callback: Callback<
      GetItemOutput<
        Item,
        PartitionKey,
        RangeKey,
        Key,
        AttributesToGet,
        ProjectionExpression,
        JsonFormat.AttributeValue
      > &
        MetadataBearer,
      any
    >
  ): void;

  deleteItem<
    Key extends TableKey<
      Item,
      PartitionKey,
      RangeKey,
      JsonFormat.AttributeValue
    >,
    ConditionExpression extends string | undefined,
    ReturnValue extends DynamoDBReturnValue = "NONE"
  >(
    params: DeleteItemInput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      ConditionExpression,
      ReturnValue,
      JsonFormat.AttributeValue
    >
  ): Promise<
    DeleteItemOutput<Item, ReturnValue, JsonFormat.AttributeValue> &
      MetadataBearer
  >;

  deleteItem<
    Key extends TableKey<
      Item,
      PartitionKey,
      RangeKey,
      JsonFormat.AttributeValue
    >,
    ConditionExpression extends string | undefined,
    ReturnValue extends DynamoDBReturnValue = "NONE"
  >(
    params: DeleteItemInput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      ConditionExpression,
      ReturnValue,
      JsonFormat.AttributeValue
    >,
    callback: Callback<
      DeleteItemOutput<Item, ReturnValue, JsonFormat.AttributeValue> &
        MetadataBearer,
      any
    >
  ): void;

  putItem<
    ConditionExpression extends string | undefined,
    ReturnValue extends DynamoDBReturnValue = "NONE"
  >(
    params: PutItemInput<
      Item,
      ConditionExpression,
      ReturnValue,
      JsonFormat.AttributeValue
    >
  ): Promise<
    PutItemOutput<Item, ReturnValue, JsonFormat.AttributeValue> & MetadataBearer
  >;

  putItem<
    ConditionExpression extends string | undefined,
    ReturnValue extends DynamoDBReturnValue = "NONE"
  >(
    params: PutItemInput<
      Item,
      ConditionExpression,
      ReturnValue,
      JsonFormat.AttributeValue
    >,
    callback: Callback<
      PutItemOutput<Item, ReturnValue, JsonFormat.AttributeValue> &
        MetadataBearer,
      any
    >
  ): void;

  updateItem<
    Key extends TableKey<
      Item,
      PartitionKey,
      RangeKey,
      JsonFormat.AttributeValue
    >,
    UpdateExpression extends string,
    ConditionExpression extends string | undefined,
    ReturnValue extends DynamoDBReturnValue = "NONE"
  >(
    params: UpdateItemInput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      UpdateExpression,
      ConditionExpression,
      ReturnValue,
      JsonFormat.AttributeValue
    >
  ): Promise<
    UpdateItemOutput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      ReturnValue,
      JsonFormat.AttributeValue
    > &
      MetadataBearer
  >;

  updateItem<
    Key extends TableKey<
      Item,
      PartitionKey,
      RangeKey,
      JsonFormat.AttributeValue
    >,
    UpdateExpression extends string,
    ConditionExpression extends string | undefined,
    ReturnValue extends DynamoDBReturnValue = "NONE"
  >(
    params: UpdateItemInput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      UpdateExpression,
      ConditionExpression,
      ReturnValue,
      JsonFormat.AttributeValue
    >,
    callback?: Callback<
      UpdateItemOutput<
        Item,
        PartitionKey,
        RangeKey,
        Key,
        ReturnValue,
        JsonFormat.AttributeValue
      > &
        MetadataBearer,
      any
    >
  ): void;

  query<
    KeyConditionExpression extends string | undefined = undefined,
    FilterExpression extends string | undefined = undefined,
    ProjectionExpression extends string | undefined = undefined,
    AttributesToGet extends keyof Item | undefined = undefined
  >(
    params: QueryInput<
      Item,
      KeyConditionExpression,
      FilterExpression,
      ProjectionExpression,
      AttributesToGet,
      JsonFormat.AttributeValue
    >
  ): Promise<
    QueryOutput<Item, AttributesToGet, JsonFormat.AttributeValue> &
      MetadataBearer
  >;

  query<
    KeyConditionExpression extends string | undefined = undefined,
    FilterExpression extends string | undefined = undefined,
    AttributesToGet extends keyof Item | undefined = undefined
  >(
    params: QueryInput<
      Item,
      KeyConditionExpression,
      FilterExpression,
      ProjectionExpression,
      AttributesToGet,
      JsonFormat.AttributeValue
    >,
    callback: Callback<
      QueryOutput<Item, AttributesToGet, JsonFormat.AttributeValue> &
        MetadataBearer,
      any
    >
  ): void;

  scan<
    FilterExpression extends string | undefined = undefined,
    ProjectionExpression extends string | undefined = undefined,
    AttributesToGet extends keyof Item | undefined = undefined
  >(
    params: ScanInput<
      Item,
      FilterExpression,
      ProjectionExpression,
      AttributesToGet,
      JsonFormat.Document
    >
  ): Promise<
    ScanOutput<Item, AttributesToGet, JsonFormat.AttributeValue> &
      MetadataBearer
  >;

  scan<
    FilterExpression extends string | undefined = undefined,
    ProjectionExpression extends string | undefined = undefined,
    AttributesToGet extends keyof Item | undefined = undefined
  >(
    params: ScanInput<
      Item,
      FilterExpression,
      ProjectionExpression,
      AttributesToGet,
      JsonFormat.AttributeValue
    >,
    callback?: Callback<
      ScanOutput<Item, AttributesToGet, JsonFormat.AttributeValue> &
        MetadataBearer,
      any
    >
  ): void;
}

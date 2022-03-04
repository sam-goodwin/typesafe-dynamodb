import type { ReturnValue as DynamoDBReturnValue } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { MetadataBearer } from "@aws-sdk/types";
import { ProjectionExpression } from "aws-sdk/clients/dynamodb";
import { Callback } from "./callback";
import { DeleteItemInput, DeleteItemOutput } from "./delete-item";
import { JsonFormat } from "./format";
import { GetItemInput, GetItemOutput } from "./get-item";
import { TableKey } from "./key";
import { PutItemInput, PutItemOutput } from "./put-item";
import { QueryInput, QueryOutput } from "./query";
import { ScanInput, ScanOutput } from "./scan";
import { UpdateItemInput, UpdateItemOutput } from "./update-item";

export interface TypeSafeDocumentClientV3<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined = undefined
> extends Omit<
    DynamoDBDocument,
    "get" | "delete" | "put" | "update" | "query" | "scan"
  > {
  get<
    Key extends TableKey<Item, PartitionKey, RangeKey, JsonFormat.Document>,
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
      JsonFormat.Document
    >
  ): Promise<
    GetItemOutput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      AttributesToGet,
      ProjectionExpression,
      JsonFormat.Document
    > &
      MetadataBearer
  >;

  get<
    Key extends TableKey<Item, PartitionKey, RangeKey, JsonFormat.Document>,
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
      JsonFormat.Document
    >,
    callback: Callback<
      GetItemOutput<
        Item,
        PartitionKey,
        RangeKey,
        Key,
        AttributesToGet,
        ProjectionExpression,
        JsonFormat.Document
      >,
      any
    >
  ): void;

  delete<
    Key extends TableKey<Item, PartitionKey, RangeKey, JsonFormat.Document>,
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
      JsonFormat.Document
    >
  ): Promise<
    DeleteItemOutput<Item, ReturnValue, JsonFormat.Document> & MetadataBearer
  >;

  delete<
    Key extends TableKey<Item, PartitionKey, RangeKey, JsonFormat.Document>,
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
      JsonFormat.Document
    >,
    callback: Callback<
      DeleteItemOutput<Item, ReturnValue, JsonFormat.Document> & MetadataBearer,
      any
    >
  ): void;

  put<
    ConditionExpression extends string | undefined,
    ReturnValue extends DynamoDBReturnValue = "NONE"
  >(
    params: PutItemInput<
      Item,
      ConditionExpression,
      ReturnValue,
      JsonFormat.Document
    >
  ): Promise<
    PutItemOutput<Item, ReturnValue, JsonFormat.Document> & MetadataBearer
  >;

  put<
    ConditionExpression extends string | undefined,
    ReturnValue extends DynamoDBReturnValue = "NONE"
  >(
    params: PutItemInput<
      Item,
      ConditionExpression,
      ReturnValue,
      JsonFormat.Document
    >,
    callback: Callback<
      PutItemOutput<Item, ReturnValue, JsonFormat.Document> & MetadataBearer,
      any
    >
  ): void;

  update<
    Key extends TableKey<Item, PartitionKey, RangeKey, JsonFormat.Document>,
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
      JsonFormat.Document
    >
  ): Promise<
    UpdateItemOutput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      ReturnValue,
      JsonFormat.Document
    >
  >;

  update<
    Key extends TableKey<Item, PartitionKey, RangeKey, JsonFormat.Document>,
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
      JsonFormat.Document
    >,
    callback?: Callback<
      UpdateItemOutput<
        Item,
        PartitionKey,
        RangeKey,
        Key,
        ReturnValue,
        JsonFormat.Document
      >,
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
      JsonFormat.Document
    >
  ): Promise<
    QueryOutput<Item, AttributesToGet, JsonFormat.Document> & MetadataBearer
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
      JsonFormat.Document
    >,
    callback: Callback<
      QueryOutput<Item, AttributesToGet, JsonFormat.Document> & MetadataBearer,
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
  ): Promise<ScanOutput<Item, AttributesToGet, JsonFormat.Document>>;

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
    >,
    callback?: Callback<
      ScanOutput<Item, AttributesToGet, JsonFormat.Document> & MetadataBearer,
      any
    >
  ): void;
}

import type { AWSError, DynamoDB, Request } from "aws-sdk";
import { Callback } from "./callback";
import { DeleteItemInput, DeleteItemOutput } from "./delete-item";
import { JsonFormat } from "./format";
import { GetItemInput, GetItemOutput } from "./get-item";
import { TableKey } from "./key";
import { PutItemInput, PutItemOutput } from "./put-item";
import { QueryInput, QueryOutput } from "./query";
import { ScanInput, ScanOutput } from "./scan";
import { UpdateItemInput, UpdateItemOutput } from "./update-item";

export interface TypeSafeDocumentClientV2<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined = undefined
> extends Omit<
    DynamoDB.DocumentClient,
    "get" | "delete" | "put" | "query" | "scan" | "update"
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
    >,
    callback?: Callback<
      GetItemOutput<
        Item,
        PartitionKey,
        RangeKey,
        Key,
        AttributesToGet,
        ProjectionExpression,
        JsonFormat.Document
      >,
      AWSError
    >
  ): Request<
    GetItemOutput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      AttributesToGet,
      ProjectionExpression,
      JsonFormat.Document
    >,
    AWSError
  >;

  delete<
    Key extends TableKey<Item, PartitionKey, RangeKey, JsonFormat.Document>,
    ConditionExpression extends string | undefined,
    ReturnValue extends DynamoDB.ReturnValue = "NONE"
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
    callback?: Callback<
      DeleteItemOutput<Item, ReturnValue, JsonFormat.Document>,
      AWSError
    >
  ): Request<
    DeleteItemOutput<Item, ReturnValue, JsonFormat.Document>,
    AWSError
  >;

  put<
    ConditionExpression extends string | undefined,
    ReturnValue extends DynamoDB.ReturnValue = "NONE"
  >(
    params: PutItemInput<
      Item,
      ConditionExpression,
      ReturnValue,
      JsonFormat.Document
    >,
    callback?: Callback<
      PutItemOutput<Item, ReturnValue, JsonFormat.Document>,
      AWSError
    >
  ): Request<PutItemOutput<Item, ReturnValue, JsonFormat.Document>, AWSError>;

  update<
    Key extends TableKey<Item, PartitionKey, RangeKey, JsonFormat.Document>,
    UpdateExpression extends string,
    ConditionExpression extends string | undefined,
    ReturnValue extends DynamoDB.ReturnValue = "NONE"
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
      AWSError
    >
  ): Request<
    UpdateItemOutput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      ReturnValue,
      JsonFormat.Document
    >,
    AWSError
  >;

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
    >,
    callback?: Callback<
      QueryOutput<Item, AttributesToGet, JsonFormat.Document>,
      AWSError
    >
  ): Request<QueryOutput<Item, AttributesToGet, JsonFormat.Document>, AWSError>;

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
      ScanOutput<Item, AttributesToGet, JsonFormat.Document>,
      AWSError
    >
  ): Request<ScanOutput<Item, AttributesToGet, JsonFormat.Document>, AWSError>;
}

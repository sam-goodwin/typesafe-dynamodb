import type { AWSError, DynamoDB, Request } from "aws-sdk";
import { BatchGetItemInput, BatchGetItemOutput } from "./batch-get-item";
import { Callback } from "./callback";
import { DeleteItemInput, DeleteItemOutput } from "./delete-item";
import { GetItemInput, GetItemOutput } from "./get-item";
import { KeyAttribute } from "./key";
import { PutItemInput, PutItemOutput } from "./put-item";
import { QueryInput, QueryOutput } from "./query";
import { UpdateItemInput, UpdateItemOutput } from "./update-item";

export interface TypeSafeDynamoDBv2<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined = undefined
> extends Omit<
    DynamoDB,
    | "getItem"
    | "deleteItem"
    | "putItem"
    | "query"
    | "updateItem"
    | "batchGetItem"
  > {
  getItem<
    Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
    AttributesToGet extends keyof Item | undefined = undefined,
    ProjectionExpression extends string | undefined = undefined
  >(
    params: GetItemInput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      AttributesToGet,
      ProjectionExpression
    >,
    callback?: Callback<
      GetItemOutput<Item, Key, AttributesToGet, ProjectionExpression>,
      AWSError
    >
  ): Request<
    GetItemOutput<Item, Key, AttributesToGet, ProjectionExpression>,
    AWSError
  >;

  deleteItem<
    Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
    ConditionExpression extends string | undefined,
    ReturnValue extends DynamoDB.ReturnValue = "NONE"
  >(
    params: DeleteItemInput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      ConditionExpression,
      ReturnValue
    >,
    callback?: Callback<DeleteItemOutput<Item, ReturnValue>, AWSError>
  ): Request<DeleteItemOutput<Item, ReturnValue>, AWSError>;

  putItem<
    ConditionExpression extends string | undefined,
    ReturnValue extends DynamoDB.ReturnValue = "NONE"
  >(
    params: PutItemInput<Item, ConditionExpression, ReturnValue>,
    callback?: Callback<PutItemOutput<Item, ReturnValue>, AWSError>
  ): Request<PutItemOutput<Item, ReturnValue>, AWSError>;

  updateItem<
    Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
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
      ReturnValue
    >,
    callback?: Callback<
      UpdateItemOutput<Item, PartitionKey, RangeKey, Key, ReturnValue>,
      AWSError
    >
  ): Request<
    UpdateItemOutput<Item, PartitionKey, RangeKey, Key, ReturnValue>,
    AWSError
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
      AttributesToGet
    >,
    callback?: Callback<QueryOutput<Item, AttributesToGet>, AWSError>
  ): Request<QueryOutput<Item, AttributesToGet>, AWSError>;

  batchGetItem<
    Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
    AttributesToGet extends keyof Item | undefined = undefined,
    ProjectionExpression extends string | undefined = undefined
  >(
    params: BatchGetItemInput<
      Item,
      Key,
      PartitionKey,
      RangeKey,
      AttributesToGet,
      ProjectionExpression
    >,
    callback?: Callback<
      BatchGetItemOutput<Item, Key, AttributesToGet, ProjectionExpression>,
      AWSError
    >
  ): Request<
    BatchGetItemOutput<Item, Key, AttributesToGet, ProjectionExpression>,
    AWSError
  >;
}

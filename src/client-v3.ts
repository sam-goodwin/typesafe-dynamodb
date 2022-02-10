import type {
  DynamoDB,
  ReturnValue as DynamoDBReturnValue,
} from "@aws-sdk/client-dynamodb";
import { MetadataBearer } from "@aws-sdk/types";
import { Callback } from "./callback";
import { DeleteItemInput, DeleteItemOutput } from "./delete-item";
import { GetItemInput, GetItemOutput } from "./get-item";
import { KeyAttribute } from "./key";
import { PutItemInput, PutItemOutput } from "./put-item";
import { QueryInput, QueryOutput } from "./query";

export interface TypeSafeDynamoDBv3<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined = undefined
> extends Omit<DynamoDB, "getItem" | "deleteItem" | "putItem" | "query"> {
  getItem<
    Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
    AttributesToGet extends keyof Item | undefined = undefined,
    ProjectionExpression extends string | undefined = undefined
  >(
    params: GetItemInput<
      Item,
      Key,
      PartitionKey,
      RangeKey,
      AttributesToGet,
      ProjectionExpression
    >
  ): Promise<
    GetItemOutput<Item, Key, AttributesToGet, ProjectionExpression> &
      MetadataBearer
  >;

  getItem<
    Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
    AttributesToGet extends keyof Item | undefined = undefined,
    ProjectionExpression extends string | undefined = undefined
  >(
    params: GetItemInput<
      Item,
      Key,
      PartitionKey,
      RangeKey,
      AttributesToGet,
      ProjectionExpression
    >,
    callback: Callback<
      GetItemOutput<Item, Key, AttributesToGet, ProjectionExpression>,
      any
    >
  ): void;

  deleteItem<
    Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
    ConditionExpression extends string | undefined,
    ReturnValue extends DynamoDBReturnValue = "NONE"
  >(
    params: DeleteItemInput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      ConditionExpression,
      ReturnValue
    >
  ): Promise<DeleteItemOutput<Item, ReturnValue> & MetadataBearer>;

  deleteItem<
    Key extends KeyAttribute<Item, PartitionKey, RangeKey>,
    ConditionExpression extends string | undefined,
    ReturnValue extends DynamoDBReturnValue = "NONE"
  >(
    params: DeleteItemInput<
      Item,
      PartitionKey,
      RangeKey,
      Key,
      ConditionExpression,
      ReturnValue
    >,
    callback: Callback<
      DeleteItemOutput<Item, ReturnValue> & MetadataBearer,
      any
    >
  ): void;

  putItem<
    ConditionExpression extends string | undefined,
    ReturnValue extends DynamoDBReturnValue = "NONE"
  >(
    params: PutItemInput<Item, ConditionExpression, ReturnValue>
  ): Promise<PutItemOutput<Item, ReturnValue> & MetadataBearer>;

  putItem<
    ConditionExpression extends string | undefined,
    ReturnValue extends DynamoDBReturnValue = "NONE"
  >(
    params: PutItemInput<Item, ConditionExpression, ReturnValue>,
    callback: Callback<PutItemOutput<Item, ReturnValue> & MetadataBearer, any>
  ): void;

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
    >
  ): Promise<QueryOutput<Item, AttributesToGet> & MetadataBearer>;

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
    callback: Callback<QueryOutput<Item, AttributesToGet> & MetadataBearer, any>
  ): void;
}

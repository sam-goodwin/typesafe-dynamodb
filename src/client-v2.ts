import type { AWSError, DynamoDB, Request } from "aws-sdk";
import { Callback } from "./callback";
import { DeleteItemInput, DeleteItemOutput } from "./delete-item";
import { JsonFormat } from "./json-format";
import { GetItemInput, GetItemOutput } from "./get-item";
import { TableKey } from "./key";
import { PutItemInput, PutItemOutput } from "./put-item";
import { QueryInput, QueryOutput } from "./query";
import { ScanInput, ScanOutput } from "./scan";
import { UpdateItemInput, UpdateItemOutput } from "./update-item";

export interface TypeSafeDynamoDBv2<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined = undefined
> extends Omit<
    DynamoDB,
    "getItem" | "deleteItem" | "putItem" | "query" | "scan" | "updateItem"
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
    >,
    callback?: Callback<
      GetItemOutput<
        Item,
        PartitionKey,
        RangeKey,
        Key,
        AttributesToGet,
        ProjectionExpression,
        JsonFormat.AttributeValue
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
      JsonFormat.AttributeValue
    >,
    AWSError
  >;

  deleteItem<
    Key extends TableKey<
      Item,
      PartitionKey,
      RangeKey,
      JsonFormat.AttributeValue
    >,
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
      JsonFormat.AttributeValue
    >,
    callback?: Callback<
      DeleteItemOutput<Item, ReturnValue, JsonFormat.AttributeValue>,
      AWSError
    >
  ): Request<
    DeleteItemOutput<Item, ReturnValue, JsonFormat.AttributeValue>,
    AWSError
  >;

  putItem<
    ConditionExpression extends string | undefined,
    ReturnValue extends DynamoDB.ReturnValue = "NONE"
  >(
    params: PutItemInput<
      Item,
      ConditionExpression,
      ReturnValue,
      JsonFormat.AttributeValue
    >,
    callback?: Callback<
      PutItemOutput<Item, ReturnValue, JsonFormat.AttributeValue>,
      AWSError
    >
  ): Request<
    PutItemOutput<Item, ReturnValue, JsonFormat.AttributeValue>,
    AWSError
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
      JsonFormat.AttributeValue
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
      JsonFormat.AttributeValue
    >,
    callback?: Callback<
      QueryOutput<Item, AttributesToGet, JsonFormat.AttributeValue>,
      AWSError
    >
  ): Request<
    QueryOutput<Item, AttributesToGet, JsonFormat.AttributeValue>,
    AWSError
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
      ScanOutput<Item, AttributesToGet, JsonFormat.AttributeValue>,
      AWSError
    >
  ): Request<
    ScanOutput<Item, AttributesToGet, JsonFormat.AttributeValue>,
    AWSError
  >;
}

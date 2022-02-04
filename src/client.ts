import type { AWSError, DynamoDB, Request } from "aws-sdk";
import { Callback } from "./callback";
import { DeleteItemInput, DeleteItemOutput } from "./delete-item";
import { GetItemInput, GetItemOutput } from "./get-item";
import { PutItemInput, PutItemOutput } from "./put-item";
import { QueryInput, QueryOutput } from "./query";

export interface TypeSafeDynamoDB<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined = undefined
> extends Omit<DynamoDB, "getItem" | "deleteItem" | "putItem" | "query"> {
  getItem<AttributesToGet extends keyof Item | undefined>(
    params: GetItemInput<Item, PartitionKey, RangeKey, AttributesToGet>,
    callback?: Callback<GetItemOutput<Item, AttributesToGet>, AWSError>
  ): Request<GetItemOutput<Item, AttributesToGet>, AWSError>;

  deleteItem<
    ConditionExpression extends string | undefined,
    ReturnValue extends DynamoDB.ReturnValue = "NONE"
  >(
    params: DeleteItemInput<Item, ConditionExpression, ReturnValue>,
    callback?: Callback<DeleteItemOutput<Item, ReturnValue>, AWSError>
  ): Request<DeleteItemOutput<Item, ReturnValue>, AWSError>;

  putItem<
    ConditionExpression extends string | undefined,
    ReturnValue extends DynamoDB.ReturnValue = "NONE"
  >(
    params: PutItemInput<Item, ConditionExpression, ReturnValue>,
    callback?: Callback<PutItemOutput<Item, ReturnValue>, AWSError>
  ): Request<PutItemOutput<Item, ReturnValue>, AWSError>;

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
}

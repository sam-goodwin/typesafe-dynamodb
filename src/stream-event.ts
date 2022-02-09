import * as lambda from "aws-lambda";
import { ToAttributeMap } from "./attribute-value";

export interface DynamoDBStreamEvent<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  StreamViewType extends Exclude<
    lambda.StreamRecord["StreamViewType"],
    undefined
  >
> {
  Records: DynamoDBRecord<Item, PartitionKey, RangeKey, StreamViewType>[];
}
export interface DynamoDBRecord<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  StreamViewType extends lambda.StreamRecord["StreamViewType"] = undefined
> extends Omit<lambda.DynamoDBRecord, "dynamodb"> {
  dynamodb?: StreamRecord<Item, PartitionKey, RangeKey, StreamViewType>;
}

// @ts-ignore
export type StreamRecord<
  Item extends object,
  PartitionKey extends keyof Item,
  RangeKey extends keyof Item | undefined,
  StreamViewType extends lambda.StreamRecord["StreamViewType"] = undefined
> = Omit<
  lambda.StreamRecord,
  "Keys" | "NewImage" | "OldImage" | "StreamViewType"
> & {
  Keys: ToAttributeMap<Pick<Item, Exclude<PartitionKey | RangeKey, undefined>>>;
} & (StreamViewType extends "NEW_IMAGE"
    ? {
        NewImage: ToAttributeMap<Item>;
      }
    : StreamViewType extends "OLD_IMAGE"
    ? {
        OldImage: ToAttributeMap<Item>;
      }
    : StreamViewType extends "NEW_AND_OLD_IMAGES"
    ? {
        NewImage?: ToAttributeMap<Item>;
        OldImage: ToAttributeMap<Item>;
      }
    : {});

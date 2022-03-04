import { NativeBinaryAttribute } from "./attribute-value";

export interface CreateSet {
  /**
   * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#createSet-property
   */
  createSet<T extends any[]>(
    list: T
  ): {
    type: T[number] extends string
      ? "String"
      : T[number] extends number
      ? "Number"
      : T[number] extends NativeBinaryAttribute
      ? "Binary"
      : never;
    values: T;
  };
}

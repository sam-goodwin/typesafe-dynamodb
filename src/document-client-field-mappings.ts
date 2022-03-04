/**
 * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
 */
export type ToDocumentClient<
  T extends {
    [k in string]: any;
  }
> = {
  batchGet: T["batchGetItem"];
  batchWrite: T["batchWriteItem"];
  delete: T["deleteItem"];
  get: T["getItem"];
  put: T["putItem"];
  query: T["query"];
  scan: T["scan"];
  transactGet: T["transactGetItems"];
  transactWrite: T["transactWriteItems"];
  update: T["updateItem"];
};

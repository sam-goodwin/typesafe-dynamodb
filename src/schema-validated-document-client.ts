import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { z } from "zod";

export class SchemaValidatedDocumentClient {
  constructor(private client: DynamoDBDocumentClient) {}

  async send<T, Item extends object>(
    command: T,
    schema?: z.ZodSchema<Item>,
  ): Promise<
    T extends { input: { Key: any } }
      ? { Item?: Item; $metadata: any }
      : T extends { input: { KeyConditionExpression?: any } }
        ? {
            Items?: Item[];
            $metadata: any;
            Count?: number;
            ScannedCount?: number;
            LastEvaluatedKey?: any;
          }
        : T extends { input: { FilterExpression?: any } }
          ? {
              Items?: Item[];
              $metadata: any;
              Count?: number;
              ScannedCount?: number;
              LastEvaluatedKey?: any;
            }
          : Awaited<ReturnType<DynamoDBDocumentClient["send"]>>
  > {
    const result = await this.client.send(command as any);

    if (schema) {
      if ("Item" in result && result.Item) {
        (result as any).Item = schema.parse(result.Item);
      }

      if ("Items" in result && result.Items) {
        (result as any).Items = result.Items.map((item: any) =>
          schema.parse(item),
        );
      }
    }

    return result as any;
  }
}

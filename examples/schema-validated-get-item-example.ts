import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { z } from "zod";
import { SchemaValidatedDocumentClient } from "../src/schema-validated-document-client";
import { SchemaValidatedGetDocumentCommand } from "../src/schema-validated-get-document-command";

const UserSchema = z.object({
  pk: z.templateLiteral(["USER", "#", z.uuid()]),
  sk: z.literal("METADATA"),
  userId: z.string(),
  email: z.string().email(),
  name: z.string(),
  age: z.number().min(0),
  preferences: z.object({
    theme: z.enum(["light", "dark"]),
    notifications: z.boolean(),
  }),
});

type User = z.infer<typeof UserSchema>;

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);
const validatedClient = new SchemaValidatedDocumentClient(docClient);

const GetUserCommand = SchemaValidatedGetDocumentCommand<User, "pk", "sk">(
  UserSchema,
);

async function getUserExample() {
  try {
    const result = await validatedClient.send(
      new GetUserCommand({
        TableName: "Users",
        Key: {
          pk: "USER#00000000-0000-0000-0000-000000000000",
          sk: "METADATA",
        },
      }),
      UserSchema,
    );

    if (result.Item) {
      console.log("Validated user:", result.Item);
      return result.Item;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Schema validation failed:", error.issues);
    } else {
      console.error("DynamoDB error:", error);
    }
    throw error;
  }
}

async function getUserDocumentExample() {
  try {
    const result = await validatedClient.send(
      new GetUserCommand({
        TableName: "Users",
        Key: {
          pk: "USER#00000000-0000-0000-0000-000000000000",
          sk: "METADATA",
        },
      }),
      UserSchema,
    );

    if (result.Item) {
      console.log("Validated user:", result.Item);
      return result.Item;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Schema validation failed:", error.issues);
    } else {
      console.error("DynamoDB error:", error);
    }
    throw error;
  }
}

export { getUserExample, getUserDocumentExample, UserSchema };

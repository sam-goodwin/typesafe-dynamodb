import "jest";
import { z } from "zod";
import { SchemaValidatedGetItemCommand } from "../src/schema-validated-get-item-command";

const MyTypeSchema = z.object({
  pk: z.string(),
  sk: z.number(),
  list: z.array(z.string()),
});

type MyType = z.infer<typeof MyTypeSchema>;

const GetItemCommand = SchemaValidatedGetItemCommand<MyType, "pk", "sk">(
  MyTypeSchema,
);

it("should have schema attached", () => {
  expect(GetItemCommand._schema).toBe(MyTypeSchema);
});

it("should work with type-safe operations", async () => {
  const getCommand = new GetItemCommand({
    TableName: "test-table",
    Key: {
      pk: {
        S: "test-pk",
      },
      sk: {
        N: "1",
      },
    },
    ProjectionExpression: "pk, sk",
  });

  // Type checking - these should be available
  expect(getCommand.input.Key.pk.S).toBe("test-pk");
  expect(getCommand.input.Key.sk.N).toBe("1");
});

# typesafe-dynamodb

This is a type-only library that can be used to augment a standard AWS SDK v2 client library for AWS DynamoDB.

## Installation

```
npm install --save-dev typesafe-dynamodb
```

## Usage

Declare standard TypeScript types to represent the data in your table:

```ts
interface Record {
  key: string;
  sort: number;
  attribute: string;
  // all types are allowed, such as recursive nested types
  records?: Record[];
}
```

Then, cast your `DynamoDB` table instance to `TypeSafeDynamoDB`;

```ts
import { DynamoDB } from "aws-sdk";

const dynamodb = new DynamoDB() as TypeSafeDynamoDB<Record, "key", "sort">;
```

The `TypeSafeDynamoDB` type replaces the `getItem`, `putItem`, `deleteItem` and `query` API calls with an implementation that understands the structure of data in the table.

## Features

### Type-aware Input and Output

The type of the `Key` is derived from the `Record` type.

![typesafe GetItem Key](img/get-item.gif)

Same for the `Item` in the response:

![typesafe GetItemOutput Item](img/get-item-response.gif)

### Filter of AttributesToGet

If you specify `AttributesToGet`, then the returned type only contains those properties.

![typesafe AttributesToGet](img/get-item-attributes.gif)

### Validate ExpressionAttributeNames and ExpressionAttributeValues

If you add a `ConditionExpression` in `putItem`, you will be prompted for any `#name` or `:valu` placeholders:

![typesafe putItem ConditionExpression](img/put-item-expression.gif)

Same is true for a `query`:

![typesafe query KeyConditionExpression and Filter](img/query-expression.gif)

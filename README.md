# typesafe-dynamodb

[![npm version](https://badge.fury.io/js/typesafe-dynamodb.svg)](https://badge.fury.io/js/typesafe-dynamodb)

`typesafe-dynamodb` is a type-only library which replaces the type signatures of the AWS SDK's DynamoDB client. It substitutes `getItem`, `putItem`, `deleteItem` and `query` API methods with type-safe alternatives that are aware of the data in your tables and also adaptive to the semantics of the API request, e.g. by validating `ExpressionAttributeNames` and `ExpressionAttributeValues` contain all the values used in a `ConditionExpression` string, or by understanding the effect of a `ProjectionExpression` on the returned data type.

The end goal is to provide types that have total understanding of the AWS DynamoDB API and enable full utilization of the TypeScript type system for modeling complex DynmaoDB tables, such as the application of union types and template string literals for single-table designs.

## Installation

```
npm install --save-dev typesafe-dynamodb
```

## Usage

This library contains type definitions for both AWS SDK v2 (`aws-sdk`) and AWS SDK v3 (`@aws-sdk/client-dynamodb`);

### AWS SDK v2

To use `typesafe-dynamodb` with the AWS SDK v2, there is no need to change anything about your existing runtime code. It is purely type definitions, so you only need to cast an instance of `AWS.DynamoDB` to the `TypeSafeDynamoDBv2<T, HashKey, RangeKey>` interface and use the client as normal, except now you can enjoy a dynamic, type-safe experience in your IDE instead.

```ts
import { DynamoDB } from "aws-sdk";

const client = new DynamoDB();
```

Start by declaring a standard TypeScript interface which describes the structure of data in your DynamoDB Table:

```ts
interface Record {
  key: string;
  sort: number;
  attribute: string;
  // all types are allowed, such as recursive nested types
  records?: Record[];
}
```

Then, cast the `DynamoDB` client instance to `TypeSafeDynamoDB`;

```ts
import { TypeSafeDynamoDBv2 } from "typesafe-dynamodb/lib/client-v2";

const typesafeClient: TypeSafeDynamoDBv2<Record, "key", "sort"> = client;
```

`"key"` is the name of the Hash Key attribute, and `"sort"` is the name of the Range Key attribute.

Finally, use the client as you normally would, except now with intelligent type hints and validations.

### AWS SDK v3

#### Option 1 - DynamoDB (similar to SDK v2)

`DynamoDB` is an almost identical implementation to the AWS SDK v2, except with minor changes such as returning a `Promise` by default. It is a convenient way of using the DynamoDB API, except it is not optimized for tree-shaking (for that, see Option 2).

To override the types, follow a similar method to v2, except by importing TypeSafeDynamoDBv3 (instead of v2):

```ts
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { TypeSafeDynamoDBv3 } from "typesafe-dynamodb/lib/client-v3";

const client = new DynamoDB({..});
const typesafeClient: TypeSafeDynamoDBv3<Record, "key", "sort"> = client;
```

#### Option 2 - DynamoDBClient (a Command-Response interface optimized for tree-shaking)

`DynamoDBClient` is a generic interface with a single method, `send`. To invoke an API, call `send` with an instance of the API's corresponding `Command`.

This option is designed for optimal tree-shaking when bundling code, ensuring that the bundle only includes code for the APIs your application uses.

For this option, type-safety is achieved by declaring your own commands and then calling the standard `DynamoDBClient`:

```ts
interface MyType {
  key: string;
  sort: number;
  list: string[];
}

const client = new DynamoDBClient({});

const GetMyTypeCommand = TypeSafeGetItemCommand<MyType, "key", "sort">();

await client.send(
  new GetMyTypeCommand({
    ..
  })
);
```

## Features

### Type-aware Input and Output

The type of the `Key` is derived from the `Record` type.

![typesafe GetItem Key](img/get-item.gif)

Same for the `Item` in the response:

![typesafe GetItemOutput Item](img/get-item-response.gif)

### Single Table Design

Below are two `interface` declarations, representing two types of data stored in a single DynamoDB table - `User` and `Order`. Single table design in DynamoDB is achieved by creating "composite keys", e.g. `USER#${UserID}`. In TypeScript, we use template literal types to encode this in the Type System.

```ts
interface User<UserID extends string = string> {
  PK: `USER#${UserID}`;
  SK: `#PROFILE#${UserID}`;
  Username: string;
  FullName: string;
  Email: string;
  CreatedAt: Date;
  Address: string;
}

interface Order<
  UserID extends string = string,
  OrderID extends string = string
> {
  PK: `USER#${UserID}`;
  SK: `ORDER#${OrderID}`;
  Username: string;
  OrderID: string;
  Status: "PLACED" | "SHIPPED";
  CreatedAt: Date;
  Address: string;
}
```

With these two types defined, you can now use a union type to declare a `TypeSafeDynamoDB` instance aware of the two types of data in your tables:

```ts
const client: TypeSafeDynamoDB<User | Order, "PK", "SK">;
```

When making calls such as `getItem`, TypeScript will narrow the returned data type to the corresponding type based on the structure of the `Key` in your request:

![narrowed getItem](img/get-order.png)

### Type-Safe DynamoDBStreamEvent

Leverage your data types in Lambda Functions attached to the DynamoDB Table Stream:

```ts
import { DynamoDBStreamEvent } from "typesafe-dynamodb/lib/stream-event";

export async function handle(
  event: DynamoDBStreamEvent<User | Order, "PK", "SK", "KEYS_ONLY">
) {
  ..
}
```

The event's type is derived from the data type and the the `StreamViewType`, e.g. `"NEW_IMAGE" | "OLD_IMAGE" | "KEYS_ONLY" | "NEW_AND_OLD_IMAGES"`.

### Filter result with ProjectionExpression

The `ProjectionExpression` field is parsed and applied to filter the returned type of `getItem` and `query`.

![typesafe ProjectionExpression](img/get-item-projection.gif)

### Filter with AttributesToGet

If you specify `AttributesToGet`, then the returned type only contains those properties.

![typesafe AttributesToGet](img/get-item-attributes.gif)

### Validate ExpressionAttributeNames and ExpressionAttributeValues

If you add a `ConditionExpression` in `putItem`, you will be prompted for any `#name` or `:valu` placeholders:

![typesafe putItem ConditionExpression](img/put-item-expression.gif)

Same is true for a `query`:

![typesafe query KeyConditionExpression and Filter](img/query-expression.gif)

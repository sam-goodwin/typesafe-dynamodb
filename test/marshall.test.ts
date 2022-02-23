import "jest";

import { marshall, unmarshall } from "../src/marshall";

const myObject = {
  key: "key",
  sort: 123,
  binary: new Uint16Array([1]),
  buffer: Buffer.from("buffer", "utf8"),
  optional: 456,
  list: ["hello", "world"],
  record: {
    key: "nested key",
    sort: 789,
  },
} as const;

test("should marshall MyItem to ToAttributeMap<MyItem>", () => {
  const marshalled = marshall(myObject);

  marshalled.key.S;
  marshalled.sort.N;
  marshalled.binary?.B;
  marshalled.buffer?.B;
  marshalled.optional?.N;
  marshalled.list?.L[0].S;
  marshalled.list?.L[1].S;
  // @ts-expect-error
  marshalled.list?.L[2]?.S;
  marshalled.record.M.key.S;
  marshalled.record.M.sort.N;
});

test("should unmarshall MyItem from ToAttributeMap<MyItem>", () => {
  const marshalled = marshall(myObject);
  const unmarshalled = unmarshall(marshalled);

  expect(unmarshalled).toEqual(myObject);

  unmarshalled.key;
  unmarshalled.sort;
  unmarshalled.binary;
  unmarshalled.buffer;
  unmarshalled.optional.toString(10); // is a number
  unmarshalled.list?.[0];
  unmarshalled.list?.[1];
  // @ts-expect-error
  unmarshalled.list?.[2];
  unmarshalled.record.key;
  unmarshalled.record.sort.toString(10); // is a number
});

test("unmarshall should map numbers to string when wrapNumbers: true", () => {
  const marshalled = marshall(myObject);
  const unmarshalled = unmarshall(marshalled, {
    wrapNumbers: true,
  });

  const expected: typeof unmarshalled = {
    ...myObject,
    sort: {
      value: "123",
    },
    optional: {
      value: "456",
    },
    record: {
      key: "nested key",
      sort: {
        value: "789",
      },
    },
  };
  expect(unmarshalled).toEqual(expected);

  unmarshalled.key;
  unmarshalled.sort.value; // wrapped NumberValue
  unmarshalled.binary;
  unmarshalled.buffer;
  unmarshalled.optional?.value; // wrapped NumberValue
  unmarshalled.list?.[0];
  unmarshalled.list?.[1];
  // @ts-expect-error
  unmarshalled.list?.[2];
  unmarshalled.record.key;
  unmarshalled.record.sort;
});

import "jest";

import * as AWS from "aws-sdk";
import { TypeSafeDocumentClientV2 } from "../src/document-client-v2";

export interface Order<
  UserID extends string = string,
  OrderID extends string = string
> {
  PK: `USER#${UserID}`;
  SK: `ORDER#${OrderID}`;
  userId: string;
  orderId: string;
}

test("long UpdateExpression should compile", () => {
  const client: TypeSafeDocumentClientV2<Order, "PK", "SK"> =
    new AWS.DynamoDB.DocumentClient() as any;

  const userId = "userId";
  const orderId = "orderId";

  () => {
    client
      .update({
        TableName: "",
        Key: {
          PK: `USER#${userId}`,
          SK: `ORDER#${orderId}`,
        },
        UpdateExpression: `SET MyMapName.myLongFieldNameA = :myLongFieldValueA, 
                             MyMapName.myLongFieldNameB = :myLongFieldValueB,
                             MyMapName.myLongFieldNameC = :myLongFieldValueC,
                             MyMapName.myLongFieldNameD = :myLongFieldValueD,
                             MyMapName.myLongFieldNameE = :myLongFieldValueE,
                             MyMapName.myLongFieldNameF = :myLongFieldValueF,
                             MyMapName.myLongFieldNameG = :myLongFieldValueG,
                             MyMapName.myLongFieldNameG = :myLongFieldValueH,
                             MyMapName.myLongFieldNameG = :myLongFieldValueI,
                             MyMapName.myLongFieldNameG = :myLongFieldValueJ,
                             MyMapName.myLongFieldNameG = :myLongFieldValueK,
                             MyMapName.myLongFieldNameG = :myLongFieldValueL,
                             MyMapName.myLongFieldNameG = :myLongFieldValueM,
                             MyMapName.myLongFieldNameG = :myLongFieldValueN,
                          `,
        ExpressionAttributeValues: {
          ":myLongFieldValueA": 1,
          ":myLongFieldValueB": 1,
          ":myLongFieldValueC": 1,
          ":myLongFieldValueD": 1,
          ":myLongFieldValueE": 1,
          ":myLongFieldValueF": 1,
          ":myLongFieldValueG": 1,
          ":myLongFieldValueH": 1,
          ":myLongFieldValueI": 1,
          ":myLongFieldValueJ": 1,
          ":myLongFieldValueK": 1,
          ":myLongFieldValueL": 1,
          ":myLongFieldValueM": 1,
          ":myLongFieldValueN": 1,
        },
        ReturnValues: "NONE",
      })
      .promise();
  };
});

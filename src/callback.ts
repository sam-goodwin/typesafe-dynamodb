import type { AWSError } from "aws-sdk";

export type Callback<Data, Err = AWSError> = (err: Err, data: Data) => void;

import { add, subtract, multiply, divide } from "../../../utils/calculate";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      throw new Error(
        `Unsupported method ${req.method}. Only GET method is supported`
      );
    }

    const params = extractParams(req.query.params);

    let result;
    switch (params.operation) {
      case "add":
        result = add(params.first, params.second);
        break;
      case "subtract":
        result = subtract(params.first, params.second);
        break;
      case "multiply":
        result = multiply(params.first, params.second);
        break;
      case "divide":
        result = divide(params.first, params.second);
        break;
      default:
        throw new Error(`Unsupported operation ${params.operation}`);
    }
    res.status(200).json({ result });
  } catch (e) {
    let errMsg = "undefined";
    if (e instanceof Error) {
      errMsg = e.message
    }
    res.status(500).json({ message: errMsg });
  }
}
interface QueryParam {
    operation: string,
    first: number,
    second: number,
}

type QueryArray = string[] | string | undefined;

function extractParams(queryArray: QueryArray) {
  if(!queryArray) {
    throw new Error(
      `Query params should be a String Array*. Received: ${queryArray}`
    );
  }
if(typeof queryArray === 'string') {
  throw new Error(
    `Query params should be a String Array. Received ${queryArray}`
  );
}

  if (queryArray?.length !== 3) {
    throw new Error(
      `Query params should have 3 items. Received ${queryArray?.length}: ${queryArray}`
    );
  }

  try {
    const params: QueryParam = {
      operation: queryArray[0],
      first: parseInt(queryArray[1]),
      second: parseInt(queryArray[2]),
    };

    if(isNaN(params.first) || isNaN(params.second)) {
      throw new Error(
        `Query params "first" and "Second" both should be numbers. Received: ${params}`
      )
    }
    return params;
  } catch (e) {
    throw new Error(`Failed to process query params. Received: ${queryArray}`);
  }
}


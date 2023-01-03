import { createMocks } from "node-mocks-http";
import handler from "../pages/api/calculate/[...params]";

describe("test calculate API handler", () => {
  function getMockHttpObjs(method, query) {
    const { req, res } = createMocks({ method, query });
    return { req, res };
  }

  it("returns a valid result and status code when add is successful", () => {
    const { req, res } = getMockHttpObjs("GET", { params: ["add", 1, 1] });
    handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ "content-type": "application/json" });
    expect(res._getJSONData()).toEqual({ result: 2 });
  });

  it("should only accept GET method", () => {
    let req, res;

    //POST Method
    ({ req, res } = getMockHttpObjs("POST", { params: ["add", 1, 1] }));
    handler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({
      message: `Unsupported method ${req.method}. Only GET method is supported`,
    });

    //PUT METHOD
    ({ req, res } = getMockHttpObjs("PUT", { params: ["multiply", 1, 1] }));
    handler(req, res);
    expect(res.statusCode).toBe(500);

    //DELETE METHOD
    ({ req, res } = getMockHttpObjs("DELETE", { params: ["subtract", 1, 1] }));
    handler(req, res);
    expect(res.statusCode).toBe(500);

    //Whatever
    ({ req, res } = getMockHttpObjs("WHATEVER", { params: ["divide", 1, 1] }));
    handler(req, res);
    expect(res.statusCode).toBe(500);
  });

  it("should only accept GET method", () => {
    const { req, res } = getMockHttpObjs("GET", { params: ["add", 1, "a"] });
    handler(req, res);
    
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({
        message: `Query params "first" and "Second" both should be numbers. Received: add,1,a`,
    });
  });
});

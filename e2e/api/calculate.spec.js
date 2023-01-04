import { test, expect } from "@playwright/test"

test.describe("API basic functionality", () => {
  test("simple addition", async ({ request }) => {
    const result = await request.get("/api/calculate/add/1/1", {})
    expect(result.ok()).toBeTruthy()
    expect(await result.json()).toEqual({ result: 2 })
  })

  //Feature#1 Improve Form TEST

  test("invalid params", async ({ request }) => {
    const result = await request.get("/api/calculate/add/a/1", {})
    expect(result.status()).toBe(500)
    expect(await result.json()).toEqual({
      message: `Params "first" and "second" must be numbers. Received: add,a,1`,
    })
  })
})
import { test, expect } from "@playwright/test";

test.describe("API basic functionality", () => {
    test("simple addition", async ({ request }) => {
        const result = await request.get("/api/calculate/add/1/1", {});
        expect(result.ok()).toBeTruthy();
        expect(await result.json()).toEqual({result: 2});
    });

    test("simple subtraction", async ({ request }) => {
        const result = await request.get("/api/calculate/subtract/2/1", {});
        expect(result.ok()).toBeTruthy();
        expect(await result.json()).toEqual({result: 1});
    });

    test("simple multiplication", async ({ request }) => {
        const result = await request.get("/api/calculate/multiply/3/1", {});
        expect(result.ok()).toBeTruthy();
        expect(await result.json()).toEqual({result: 3});
    })

    test("simple division", async ({ request }) => {
        const result = await request.get("/api/calculate/divide/3/3", {});
        expect(result.ok()).toBeTruthy();
        expect(await result.json()).toEqual({result: 1});
    })
});

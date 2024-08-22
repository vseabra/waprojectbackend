import { measureExecutionTime } from "../../src/utils";

describe("measureExecutionTime", () => {
  it("should handle functions with no arguments", async () => {
    const noArgFunc = () => 42;
    const [result, executionTime] = await measureExecutionTime(noArgFunc);

    expect(result).toBe(42);
    expect(executionTime).toBeGreaterThan(0);
  });

  it("should handle functions that throw errors", async () => {
    const errorFunc = () => {
      throw new Error("Test error");
    };

    await expect(measureExecutionTime(errorFunc)).rejects.toThrow("Test error");
  });

  it("should measure execution time of a function returning a promise", async () => {
    const promiseFunc = () => Promise.resolve("promise result");
    const [result, executionTime] = await measureExecutionTime(promiseFunc);

    expect(result).toBe("promise result");
    expect(executionTime).toBeGreaterThan(0);
  });
});

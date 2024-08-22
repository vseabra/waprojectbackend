import { ResultFormatter } from "../../src/application/resultFormatter";
import { ClassificationResult } from "../../src/domain";

describe("ResultFormatter", () => {
  describe("toTable", () => {
    it("should format a simple result correctly", () => {
      const result: ClassificationResult = { dog: 2, cat: 1 };
      const expected =
        "+-----+-----+\n" +
        "| dog | 2   |\n" +
        "+-----+-----+\n" +
        "| cat | 1   |\n" +
        "+-----+-----+";
      expect(ResultFormatter.toTable(result)).toBe(expected);
    });
  });

  describe("toList", () => {
    it("should format a simple result correctly", () => {
      const result: ClassificationResult = { dog: 2, cat: 1 };
      expect(ResultFormatter.toList(result)).toBe("dog = 2; cat = 1");
    });

    it("should omit keys with zero values", () => {
      const result: ClassificationResult = { dog: 2, cat: 0, bird: 1 };
      expect(ResultFormatter.toList(result)).toBe("dog = 2; bird = 1");
    });

    it('should return "0" for empty results', () => {
      const result: ClassificationResult = {};
      expect(ResultFormatter.toList(result)).toBe("0");
    });

    it('should return "0" when all values are zero', () => {
      const result: ClassificationResult = { dog: 0, cat: 0 };
      expect(ResultFormatter.toList(result)).toBe("0");
    });
  });
});

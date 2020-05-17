const plugin = require("../main");
const { expect } = require("chai");
const tests = require("./index.fixture");

describe("label_filter", () => {
  for (const test of tests) {
    it("Should work correctly", () => {
      const result = plugin({
        args: test.args,
        data: test.data,
      });
      expect(result).to.deep.equal(test.result);
    });
  }
});

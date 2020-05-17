const context = require("../../../context");
const plugin = require("../main");
const { expect } = require("chai");

describe("adultempire", () => {
  it("Should fetch covers & studio name from page", async () => {
    let error = false;
    try {
      console.log("Fetching adultempire.com...");
      const result = await plugin({
        ...context,
        movieName: "tushy raw v5",
        args: {},
      });
      expect(result).to.be.an("object");
      expect(result.frontCover).to.be.a("string");
      expect(result.backCover).to.be.a("string");
      expect(result.studio).to.be.a("string").equal("Tushy Raw");
    } catch (error) {
      console.log(error.message);
      error = true;
    }
    expect(error).to.be.false;
  });
});

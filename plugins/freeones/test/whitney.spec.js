const context = require("../../../context");
const plugin = require("../main");
const { expect } = require("chai");

function searchWhitney(args = {}) {
  return plugin({
    ...context,
    actorName: "Whitney Wright",
    args,
  });
}

describe("freeones", () => {
  it("Search 'Whitney Wright'", async () => {
    console.log("Fetching freeones.xxx...");
    const result = await searchWhitney();
    expect(result.custom).to.deep.equal({
      hairColor: "Brown",
      eyeColor: "Hazel",
      ethnicity: "Caucasian",
      height: 168,
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.a("string");
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Brown Hair");
    expect(result.labels).to.contain("Hazel Eyes");
    expect(result.labels).to.contain("Caucasian");
  });

  it("Search 'Whitney Wright', but without hairColor", async () => {
    console.log("Fetching freeones.xxx...");
    const result = await searchWhitney({
      blacklist: ["hairColor"],
    });
    expect(result.custom).to.deep.equal({
      eyeColor: "Hazel",
      ethnicity: "Caucasian",
      height: 168,
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.a("string");
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Hazel Eyes");
    expect(result.labels).to.contain("Caucasian");
  });

  it("Search 'Whitney Wright', but without eyeColor", async () => {
    console.log("Fetching freeones.xxx...");
    const result = await searchWhitney({
      blacklist: ["eyeColor"],
    });
    expect(result.custom).to.deep.equal({
      hairColor: "Brown",
      ethnicity: "Caucasian",
      height: 168,
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.a("string");
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Brown Hair");
    expect(result.labels).to.contain("Caucasian");
  });

  it("Search 'Whitney Wright', but without ethnicity", async () => {
    console.log("Fetching freeones.xxx...");
    const result = await searchWhitney({
      blacklist: ["ethnicity"],
    });
    expect(result.custom).to.deep.equal({
      hairColor: "Brown",
      eyeColor: "Hazel",
      height: 168,
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.a("string");
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Brown Hair");
    expect(result.labels).to.contain("Hazel Eyes");
  });

  it("Search 'Whitney Wright', but without height", async () => {
    console.log("Fetching freeones.xxx...");
    const result = await searchWhitney({
      blacklist: ["height"],
    });
    expect(result.custom).to.deep.equal({
      hairColor: "Brown",
      eyeColor: "Hazel",
      ethnicity: "Caucasian",
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.a("string");
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Brown Hair");
    expect(result.labels).to.contain("Hazel Eyes");
    expect(result.labels).to.contain("Caucasian");
  });

  it("Search 'Whitney Wright', but without avatar", async () => {
    console.log("Fetching freeones.xxx...");
    const result = await searchWhitney({
      blacklist: ["avatar"],
    });
    expect(result.custom).to.deep.equal({
      hairColor: "Brown",
      eyeColor: "Hazel",
      ethnicity: "Caucasian",
      height: 168,
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.undefined;
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Brown Hair");
    expect(result.labels).to.contain("Hazel Eyes");
    expect(result.labels).to.contain("Caucasian");
  });

  it("Search 'Whitney Wright', but without labels", async () => {
    console.log("Fetching freeones.xxx...");
    const result = await searchWhitney({
      blacklist: ["labels"],
    });
    expect(result.custom).to.deep.equal({
      hairColor: "Brown",
      eyeColor: "Hazel",
      ethnicity: "Caucasian",
      height: 168,
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.a("string");
    expect(result.labels).to.be.undefined;
  });

  it("Search 'Whitney Wright', but without nationality", async () => {
    console.log("Fetching freeones.xxx...");
    const result = await searchWhitney({
      blacklist: ["nationality"],
    });
    expect(result.custom).to.deep.equal({
      hairColor: "Brown",
      eyeColor: "Hazel",
      ethnicity: "Caucasian",
      height: 168,
    });
    expect(result.nationality).to.be.undefined;
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.a("string");
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Brown Hair");
    expect(result.labels).to.contain("Hazel Eyes");
    expect(result.labels).to.contain("Caucasian");
  });
});

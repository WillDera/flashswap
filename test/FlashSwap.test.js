/* eslint-disable no-undef */

const { assert } = require("chai");

// import contracts
const FlashSwap = artifacts.require("FlashSwap");
const Token = artifacts.require("Token");

// chai configuration
require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("FlashSwap", (accounts) => {
  describe("FlashSwap deployment", async () => {
    it("contract has a name", async () => {
      // arrange
      let flashSwap = await FlashSwap.new();

      // act
      const name = await flashSwap.name();

      // assert
      assert.equal(name, "FlashSwap");
    });
  });
});

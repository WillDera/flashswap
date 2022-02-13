/* eslint-disable no-undef */

const { assert } = require("chai");
const { default: Web3 } = require("web3");

// import contracts
const FlashSwap = artifacts.require("FlashSwap");
const Token = artifacts.require("Token");

// chai configuration
require("chai")
  .use(require("chai-as-promised"))
  .should();

// convert value passed to wei e.g 1000000 => 1000000000000000000000000
function tokenHelper(n) {
  return web3.utils.toWei(n, "ether");
}

contract("FlashSwap", (accounts) => {
  let flashSwap, token;

  before(async () => {
    flashSwap = await FlashSwap.new();
    token = await Token.new();
    // transfer all tokens to FlashSwap (DEX)
    await token.transfer(flashSwap.address, tokenHelper("1000000"));
  });

  describe("FlashSwap deployment", async () => {
    it("contract has a name", async () => {
      const name = await flashSwap.name();
      assert.equal(name, "FlashSwap");
    });

    it("contract has tokens", async () => {
      let balance = await token.balanceOf(flashSwap.address);

      assert.equal(balance.toString(), tokenHelper("1000000"));
    });
  });

  describe("Token deployment", async () => {
    it("contract has a name", async () => {
      const name = await token.name();

      assert.equal(name, "DApp Token");
    });
  });
});

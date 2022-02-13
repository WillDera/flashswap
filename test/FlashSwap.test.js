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

contract("FlashSwap", ([deployer, investor]) => {
  let flashSwap, token;

  before(async () => {
    token = await Token.new();
    flashSwap = await FlashSwap.new(token.address);
    // transfer all tokens to FlashSwap (DEX)
    await token.transfer(flashSwap.address, tokenHelper("1000000"));
  });

  describe("Token deployment", async () => {
    it("contract has a name", async () => {
      const name = await token.name();

      assert.equal(name, "DApp Token");
    });
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

  describe("buyTokens()", async () => {
    let result;

    before(async () => {
      // Purchase tokens before each test
      result = await flashSwap.buyTokens({
        from: investor,
        value: web3.utils.toWei("1", "ether"),
      });
    });

    it("Allows users to instantly purchase tokens at a fixed price", async () => {
      // check investor balance after purchase
      let investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokenHelper("100"));
    });
  });
});

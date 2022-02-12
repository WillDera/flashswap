/* eslint-disable no-undef */
const FlashSwap = artifacts.require("FlashSwap");
const Token = artifacts.require("Token");

module.exports = function(deployer) {
  // deploy flashswap
  deployer.deploy(FlashSwap);

  // deploy token
  deployer.deploy(Token);
};

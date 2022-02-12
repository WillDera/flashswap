/* eslint-disable no-undef */
const FlashSwap = artifacts.require("FlashSwap");
const Token = artifacts.require("Token");

module.exports = async function(deployer) {
  // deploy flashswap
  await deployer.deploy(FlashSwap);
  const flashSwap = await FlashSwap.deployed();

  // deploy token
  await deployer.deploy(Token);
  const token = await Token.deployed();

  // transfer all tokens to FlashSwap (DEX)
  await token.transfer(flashSwap.address, "1000000000000000000000000");
};

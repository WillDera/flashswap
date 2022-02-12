// eslint-disable-next-line no-undef
const FlashSwap = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(FlashSwap);
};

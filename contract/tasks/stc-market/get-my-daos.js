const { networkConfig } = require("../../helper-hardhat-config");
task(
  "get-my-daos",
  "Calls an STCMarket Contract to getMyDaos"
)
  .addOptionalParam(
    "contract",
    "The address of the STCMarket contract that you want to call"
  )
  .setAction(async taskArgs => {
    const networkId = network.config.chainId;
    const contractAddr =
      taskArgs.contract || networkConfig[networkId]["STCMarket"];

    console.log(
      "Reading data from STCMarket contract ",
      contractAddr,
      "on network",
      network.name
    );
    const STCMarketContract = await ethers.getContractAt(
      "STCMarket",
      contractAddr
    );

    const result = await STCMarketContract.getMyDaos();
    console.log("Data is:", result);
    if (
      result === "" &&
      ["hardhat", "localhost", "ganache"].indexOf(network.name) === 0
    ) {
      console.log(
        "You'll either need to wait another minute, or fix something!"
      );
    }
    if (["hardhat", "localhost", "ganache"].indexOf(network.name) >= 0) {
      console.log(
        "You'll have to manually update the value since you're on a local chain!"
      );
    }
  });

module.exports = {};

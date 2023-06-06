const networkConfig = {
  11155111: {
    name: "sepolia",
    // Deploy Operator contract parameters
    owner: "",

    // linkToken address
    linkToken: "",

    // Oracle contract address
    oracle: "",

    // Parameters for calling the setAuthorizedSenders method in the Operator contract
    authorizedSenders: "",

    // APIConsumer contract address, obtained after successful deployment
    apiAddress: "",

    // specific job for :_oracle: to run; each job is unique and returns different types of data
    jobId: "",

    // request url
    url: "",

    fee: "100000000000000000",
    fundAmount: "1000000000000000000", // 1
    automationUpdateInterval: "30",
  },
}

const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6

module.exports = {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
}

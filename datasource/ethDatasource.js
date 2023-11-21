const { RESTDataSource } = require("apollo-datasource-rest"); 

// Vitalik's Ethereum address used for example queries
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";  

// EtherscanDataSource extends RESTDataSource to make calls to Etherscan API
class EtherDataSource extends RESTDataSource {

  constructor() {
    super();
    this.baseURL = "https://api.etherscan.io/api";
  }

  async etherBalanceByAddress() {
    // Get ETH balance for an address
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  async totalSupplyOfEther() {
    // Get total ETH supply
    return this.get(
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Code for new API endpoints

  async getLatestEthereumPrice() {
    // Get latest ETH price
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  async getBlockConfirmationTime() {
    // Get estimated block confirmation time
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }
}

module.exports = EtherDataSource;
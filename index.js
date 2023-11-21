// Import Apollo Server and schema 
const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");

// Import custom data source
const EtherDataSource = require("./datasource/ethDatasource");  

// Import GraphQL schema
const typeDefs = importSchema("./schema.graphql"); 

// Require environment variables
require("dotenv").config();

// Define GraphQL resolvers
const resolvers = {
  Query: {
    // Get ether balance for an address
    etherBalanceByAddress: (root, _args, { dataSources }) =>  
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Get total ether supply
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Get latest Ethereum price
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Get average Ethereum block confirmation time
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  
  // Pass in schema and resolvers
  typeDefs,
  resolvers,
  
  // Set up data sources
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), 
  }),
});

// Set timeout and start server 
server.timeout = 0;
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
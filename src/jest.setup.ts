import { EthereumConnector } from "core/utils/Ethereum/EthConnector";
// import Ganache from 'ganache-core';

const MockEthConnector = async () => ({
  getSigner: () => ({
    getAddress: async () => "0x0000",
    getChainId: async () => "1234",
  }),
});

jest.mock("core/utils/Ethereum/EthConnector", () => {
  return {
    EthereumConnector: MockEthConnector,
  };
});

// ganache -core has problems with transpile on jsdom and node
// jest.mock("core/utils/EthProvider", () => {
//   const provider = Ganache.provider()
//  return () =>({
//    default: Ganache.provider(),
//  })
// });

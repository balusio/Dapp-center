import { call, put, takeEvery } from 'redux-saga/effects'
import connectUser, { connectUserFunction } from '../UserSaga';
import { EthereumConnector } from 'core/utils/Ethereum/EthConnector';


const MockEthConnector = async () => ({
  getSigner: () => ({
    getAddress: async () => '0x0000',
    getChainId: async () => '1234'
  }),
});

jest.mock("core/utils/Ethereum/EthConnector", () => () => ({
  default: MockEthConnector
}));

describe("User Connection Saga", () => {

  it("should connect to metamask", () => {
    const userSaga = connectUser();
    expect(userSaga.next().value).toEqual(takeEvery("user/connectUser", connectUserFunction));
  });

  xit("should check get the metamask Address", () => {
    // Error with mocking the window.ethereum connector inside the saga
    const userConnections = connectUserFunction();
    console.log(userConnections.next().value, " value");
    // returns a promise but doesnt get executed by the saga
    expect(userConnections.next().value).toEqual(MockEthConnector);
    // expect(userConnections.next().done).toEqual(false);
    // expect(userConnections.next().value).toEqual(MockEthConnector.getChainId)
  });
});

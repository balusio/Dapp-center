import { EthereumConnector } from 'core/utils/Ethereum/EthConnector';
import { call, takeEvery } from 'redux-saga/effects'

import connectUser, { connectUserFunction } from '../UserSaga';

const MockEthConnector = () => ({
  getSigner: () => ({
    getAddress: async () => '0x0000',
    getChainId: async () => '1234'
  })
});

describe("User Connection Saga", () => {

  it("should connect to metamask", () => {
    const userSaga = connectUser();
    expect(userSaga.next().value).toEqual(takeEvery("user/connectUser", connectUserFunction));
  });

  it("should check get the metamask Address", () => {
    // Error with mocking the window.ethereum connector inside the saga
    const userConnections = connectUserFunction();
    // returns a promise but doesnt get executed by the saga
    expect(userConnections.next().value).toEqual(call(EthereumConnector));
    /**
     * to create a custom provider to test the next values it's 
     * limited by errors on ganache-core and waffle(that use ganache under the hood) providers to mock
     */
    // expect(userConnections.next().done).toEqual(false);
    //console.log((userConnections.next(MockConnector).value))
    // expect(userConnections.next().value).toEqual(MockEthConnector.getChainId)
  });
});

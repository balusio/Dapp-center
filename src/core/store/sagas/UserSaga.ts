import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects'
import { 
  EthereumConnector, 
  TokenConnector,
  Provider 
} from 'core/utils/Ethereum/EthConnector';

const ADDRESS_TOKEN = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export function* connectUserFunction() {
  const provider: Provider = yield call(EthereumConnector);
  try{
    const signer = provider.getSigner();
    const address:string = yield signer.getAddress();
    const network:string = yield signer.getChainId();
    const user = {
      address,
      network
    }
    yield put({ type: "user/connectAddress", payload: user });
    yield put({ 
    type: "provider/setProvider", 
    payload: {
      provider
    }});
    yield call(getUserBalance, provider, address)
  } catch(error){
    console.error('ERROR ACCESS DENIED', error);
  }
}

export function* getUserBalance(provider: Provider, userAddress: string) {
  try{
    const userBalance: number = yield TokenConnector(ADDRESS_TOKEN, provider, userAddress);
    yield put({ 
      type: "user/setToken", 
      payload: {
        token: {
          balance: userBalance,
          name: 'DUMMY',
          symbol: 'DMMY'
        }
      } 
    })
  } catch(error) {
    console.error("error on balance", error)
  }
}



// worker Saga: will be fired on connect user action
export default function* connectUser() {
  try {
    console.log("SAGA")
    yield takeEvery("user/connectUser", connectUserFunction)

  } catch (e) {
     yield put({type: "user/setError", message: e.message});
  }
}

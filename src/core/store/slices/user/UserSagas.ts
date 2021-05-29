import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects'
import { UserState } from './UserSlice';
import { ethers } from "ethers";
import ERC20ABI from 'core/abi/erc20.json';
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* connectUser(action: PayloadAction<UserState> ) {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const address = yield call(signer.getAddress())
    const network = yield signer.getChainId();
    const ADDRESS_TOKEN = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const contract = new ethers.Contract(ADDRESS_TOKEN, ERC20ABI.abi, provider)
    const balanceToken = yield call(contract.balanceOf(address));

     yield put({type: "user/connectUser", user: {
      connected: true,
      address,
      network: `${network}`,
      tokens: [{
        address: ADDRESS_TOKEN,
        name: 'Dummy',
        balance: balanceToken.toNumber(),
      }],
      balance: '',
    }});
  } catch (e) {
     yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

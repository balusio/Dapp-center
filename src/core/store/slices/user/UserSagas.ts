import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects'
import { UserState } from './UserSlice';
import { BigNumber, ethers } from "ethers";
import ERC20ABI from 'core/abi/erc20.json';


const connectUserFunction = async (): Promise<UserState> => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const network = await signer.getChainId();

  const ADDRESS_TOKEN = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const contract = new ethers.Contract(ADDRESS_TOKEN, ERC20ABI.abi, provider)
  const balanceToken= contract.balanceOf(address);

  return{
    connected: true,
    address,
    network: `${network}`,
    tokens: [{
      address: ADDRESS_TOKEN,
      name: 'Dummy',
      balance: balanceToken.toNumber(),
    }],
    balance: '',
  };
};
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* connectUser() {
  try {
    const user: UserState = yield call(connectUserFunction);
     yield put({type: "user/connectUser", user});
  } catch (e) {
     yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

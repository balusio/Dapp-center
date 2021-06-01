import { put, select, takeEvery } from 'redux-saga/effects'
import { GetContract, Provider } from 'core/utils/Ethereum/EthConnector';
import { FormState } from 'containers/SwipeTokensContainer/SwipeTokensContainer';
import { TransactionResponse, TransactionReceipt } from "@ethersproject/abstract-provider/src.ts/index"
import { ADDRESS_TOKEN } from 'core/constants';
import { RootState } from '../store';
import { PayloadAction } from '@reduxjs/toolkit';
import { BigNumber } from '@ethersproject/bignumber';

const getProvider = ({ provider }:RootState) => provider.provider;
const getUserAddress = ({ user }:RootState) => user.address;

export function* makeTransaction({ payload }: PayloadAction<FormState>) {
  try{
    const { to, amount } = payload;
    const provider: Provider = yield select(getProvider);
    const contract = GetContract(ADDRESS_TOKEN, provider);
    const transfer: TransactionResponse = yield contract.transfer(to.value, amount.value);
    const resultTransfer: TransactionReceipt = yield transfer.wait(1);
    
    yield put({
      type: "transactions/addTransaction",
      payload: resultTransfer
    })
  
    // update balance of user
    const userAddress:string = yield select(getUserAddress);
    const balance:BigNumber = yield contract.balanceOf(userAddress);
    const formatBalance = balance.toNumber();
    
    yield put({
      type: "user/updateBalance",
      payload: formatBalance
    })
  } catch(error){
    yield put({ 
      type: "user/setError", 
      payload: {
        error: {
          name: "Transaction Error",
          message: `Error on Transaction ${error.message}`,
        }
      }
    });
  }
}
 

// worker Saga: will be fired on connect user action
export default function* connectTransactions() {
  try {
    yield takeEvery("transactions/makeTransaction", makeTransaction)
  } catch (e) {
     yield put({type: "user/setError", message: e.message});
  }
}

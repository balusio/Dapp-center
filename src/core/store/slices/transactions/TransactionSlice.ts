import { TransactionResponse } from "@ethersproject/abstract-provider/src.ts/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FormState,
  InputStatus,
} from "containers/SwipeTokensContainer/SwipeTokensContainer";

type TransactionState = {
  transactions: TransactionResponse[];
  isMakingTransaction: boolean;
};

const initialState: TransactionState = {
  transactions: [],
  isMakingTransaction: false,
};

/**
 * The provider reducer add the Provider once is setted and created to connect the account
 * into the store, in order to be accessed and manipulated on the whole app,
 */
export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    makeTransaction: (state, action: PayloadAction<FormState>) => {
      console.log("ACTION DISPATCHED");
    },
    addTransaction: (
      state,
      { payload }: PayloadAction<TransactionResponse>
    ) => {
      state.transactions.push(payload);
    },
    isMakingTransaction: (state, { payload }: PayloadAction<FormState>) => {
      isMakingTransaction: payload;
    },
  },
});

export const { makeTransaction, addTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;

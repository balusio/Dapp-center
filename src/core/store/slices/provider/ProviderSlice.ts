import {
  createSlice,
  CreateSliceOptions,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Provider } from "core/utils/Ethereum/EthConnector";
import { Contract } from "ethers";

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

type ProviderState = {
  provider: Provider | null;
  // pass the Contract to the store seems to have typescript conflicts with Immer
  // the internal library that manipulate the state
  // contract: Mutable<Contract> | null;
};

const initialState: ProviderState = {
  provider: null,
};
/**
 * The provider reducer add the Provider once is setted and created to connect the account
 * into the store, in order to be accessed and manipulated on the whole app,
 */
export const ProviderSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    setProvider: (state, { payload }: PayloadAction<ProviderState>) => {
      const { provider } = payload;
      state.provider = provider;
    },
  },
});

export const { setProvider } = ProviderSlice.actions;

export default ProviderSlice.reducer;

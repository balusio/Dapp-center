import { createSlice, CreateSliceOptions, PayloadAction } from "@reduxjs/toolkit"
import { Provider } from 'core/utils/Ethereum/EthConnector'
import { Contract } from "ethers";

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

type ProviderState = {
  provider: Provider | null;
  // pass teh Contract to the store seems to have typescript conflicts with Immer the internal library that manipulate the state
  // contract: Mutable<Contract> | null;
}

const initialState: ProviderState = {
  provider: null
}
export const ProviderSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    setProvider: (state, { payload }: PayloadAction<ProviderState>) => {
      const { provider } = payload;
      state.provider = provider;
    },
  }
})

export const { setProvider  } = ProviderSlice.actions

export default ProviderSlice.reducer;

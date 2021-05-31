import { createSlice, CreateSliceOptions, PayloadAction } from "@reduxjs/toolkit"
import { Provider } from 'core/utils/Ethereum/EthConnector'

type ProviderState = {
  provider: Provider | null;
}

export const ProviderSlice = createSlice({
  name: 'provider',
  initialState: {
    provider: null,
  } as ProviderState,
  reducers: {
    setProvider: (state, { payload }: PayloadAction<ProviderState>) => {
      const { provider } = payload;
      state.provider = provider;
    },
  }
})

export const { setProvider } = ProviderSlice.actions

export default ProviderSlice.reducer;

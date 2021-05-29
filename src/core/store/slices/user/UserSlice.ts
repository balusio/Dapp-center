import { createSlice, CreateSliceOptions, PayloadAction } from "@reduxjs/toolkit"

type Token = {
  name: string;
  address: string;
  balance: string;
}

export interface UserState {
  connected: boolean;
  address: string;
  network: string;
  tokens: Token[];
  balance: string;
}
const initialState: UserState = {
  connected: false,
  address: '',
  network: '',
  tokens : [],
  balance: '',
};

/**
 * Slices are based on standard redux patterns 
 * @see https://redux.js.org/tutorials/fundamentals/part-7-standard-patterns
 */
export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    connectUser: (state, { payload }: PayloadAction<UserState>) => {
      const { address, network, tokens, balance} = payload;
      state.connected = true,
      state.address = address;
      state.network = network;
      state.tokens = tokens;
      state.balance = balance;
    },
    updateBalance: (state, { payload }: PayloadAction<UserState>) => {
      state.balance = payload.balance;
    }
  }
})

export const { connectUser, updateBalance } = UserSlice.actions

export default UserSlice.reducer;

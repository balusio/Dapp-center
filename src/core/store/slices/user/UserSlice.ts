import { createSlice, CreateSliceOptions, PayloadAction } from "@reduxjs/toolkit"

export type Token = {
  name: string;
  address: string;
  balance: number;
}

export interface UserState {
  connected?: boolean;
  address?: string;
  network?: string;
  token?: Token | null;
  error?: Error | any;
}
const initialState: UserState = {
  connected: false,
  address: '',
  network: '',
  token: null,
  error: null,
};

/**
 * Slices are based on standard redux patterns 
 * @see https://redux.js.org/tutorials/fundamentals/part-7-standard-patterns
 */
export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    connectUser: () => {},
    connectAddress: (state, { payload }: PayloadAction<UserState>) => {
      const { address, network } = payload;
      state.connected = true;
      state.address = address;
      state.network = network;
    },
    setToken: (state, { payload }: PayloadAction<UserState>) => {
      const { token } = payload;
      state.token = token;
    },
    setError: (state, { payload }: PayloadAction<UserState>) => {
      state.error = payload.error;
    },
    updateBalance: (state, { payload }: PayloadAction<number>) => {
      if(state.token?.balance) {
        state.token.balance = payload;
      }
     
    },
  }
})

export const { connectUser, connectAddress, setError } = UserSlice.actions

export default UserSlice.reducer;

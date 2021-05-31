import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './slices/user/UserSlice';
import createSagaMiddleware from 'redux-saga'
import connectUser from './sagas/UserSaga';
import providerReducer from './slices/provider/ProviderSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    provider: providerReducer,
  },
  middleware: [
    ...getDefaultMiddleware({ 
      thunk: false,
      serializableCheck: false,
    }), 
    sagaMiddleware
  ]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const createStore = () =>{
  sagaMiddleware.run(connectUser)
  return store;
}
export default createStore;

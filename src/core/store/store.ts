import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "@redux-saga/core/effects";
import userReducer from "./slices/user/UserSlice";
import providerReducer from "./slices/provider/ProviderSlice";
import transactionReducer from "./slices/transactions/TransactionSlice";
import connectUser from "./sagas/UserSaga";
import connectTransactions from "./sagas/TransactionSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    provider: providerReducer,
    transactions: transactionReducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

function* rootSaga() {
  yield all([connectUser(), connectTransactions()]);
}
const createStore = () => {
  sagaMiddleware.run(rootSaga);
  return store;
};
export default createStore;

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user/UserSlice';
import createSagaMiddleware from 'redux-saga'
import UserSaga from './slices/user/UserSagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer
  },
  middleware: [sagaMiddleware]
})
sagaMiddleware.run(UserSaga)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;

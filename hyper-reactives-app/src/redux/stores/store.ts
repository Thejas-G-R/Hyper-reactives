// import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers/rootReducer';
import userSaga from '../sagas/UserSaga'
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({ reducer: rootReducer, middleware: () => [sagaMiddleware] });

sagaMiddleware.run(userSaga)

export default store;
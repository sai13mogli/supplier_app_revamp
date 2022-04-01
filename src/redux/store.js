// redux store is exported from this file
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootSaga from './sagas';
import rootReducer from './reducers';
import {logoutMiddleware} from './middleware/logout';
// import logger from 'redux-logger'

const PRELOADED_STATE = {};

const sagaMiddleware = createSagaMiddleware();
const middlewares = [logoutMiddleware];
const enhancers = [];
// middlewares.push(sagaMiddleware, l)
enhancers.push(applyMiddleware(...middlewares));

const store = createStore(
  rootReducer,
  PRELOADED_STATE,
  composeWithDevTools({})(applyMiddleware(sagaMiddleware, logoutMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default store;

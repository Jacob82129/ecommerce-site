import { compose, applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import { thunk } from 'redux-thunk';

import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';


import logger from 'redux-logger';

// import { loggerMiddleware } from './middleware/logger.js';


import { rootReducer } from './root-reducer';


const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['user'],
    whitelist: ['cart']
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 'development' is the default environment, so you can use 'production' to disable the logger
const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(Boolean); // also can replace it with logger if needed

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

import { createStore, applyMiddleware } from 'redux';
import middlewares from '../middleware';
import rootReducer from '../reducers';

export default function configureStore(reduxifiedServices, initialState) {
    const createStoreWithDevTools = window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore;
    const createStoreWithMiddlewares = applyMiddleware(...middlewares)(createStoreWithDevTools);
    return createStoreWithMiddlewares(rootReducer(reduxifiedServices),initialState);
}
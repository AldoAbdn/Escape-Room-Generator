import { createStore, applyMiddleware } from 'redux';
import middlewares from '../middleware';
import rootReducer from '../reducers';

/**
 * Configures store 
 * @param {Array<Service>} reduxifiedServices 
 * @param {Object} initialState 
 * @returns {Object}
 */
export default function configureStore(reduxifiedServices, initialState) {
    const createStoreWithDevTools = window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore;
    const createStoreWithMiddlewares = applyMiddleware(...middlewares)(createStoreWithDevTools);
    return createStoreWithMiddlewares(rootReducer(reduxifiedServices),initialState);
}
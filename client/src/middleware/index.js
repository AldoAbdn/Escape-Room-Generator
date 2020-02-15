import reduxThunk from 'redux-thunk';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import logger from './logger'; 

/**
 * Middleware
 * @module Middleware/index
 * @author Alistair Quinn
 */

/** Middleware */
export default [
  reduxThunk, // Thunk middleware for Redux
  reduxPromiseMiddleware(), // Resolve, reject promises with conditional optimistic updates
  // routerMiddleware(browserHistory), // !! IMPORTANT for location.href changes
  logger, // A basic middleware logger
];
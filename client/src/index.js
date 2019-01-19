//React Imports 
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter, Redirect } from 'react-router-dom';
//Redux Imports
import { Provider } from 'react-redux';
//Store 
import configureStore from './stores/store'
//Feathers
import io from 'socket.io-client';
import feathers from 'feathers-client';
//Feathers-Redux
import reduxifyServices, {getServicesStatus} from 'feathers-redux';
//CSS
import './index.css';
//Components
import App from './components/App';

//Service Worker 
import * as serviceWorker from './serviceWorker';

//Feathers Configuration 
export const feathersClient = feathers()
    .configure(feathers.socketio(io()))
    .configure(feathers.hooks());

//Configure Redux
const services = reduxifyServices(feathersClient, ['users', 'escapeRooms']);
const store = configureStore(services);
console.log(store);
//const history = syncHistoryWithStore(store);

//Router
const router = (
    <Provider store={store}>
            <BrowserRouter>
                <App services={services} getServicesStatus={getServicesStatus}/>
            </BrowserRouter>
    </Provider>
);

//Render Router 
ReactDOM.render(router, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

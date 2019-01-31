//React Imports 
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//Redux Imports
import { Provider } from 'react-redux';
//Store 
import configureStore from './stores/store'
//Feathers
import io from 'socket.io-client';
import feathers from 'feathers-client';
//Feathers-Redux
import reduxifyServices, {getServicesStatus, bindWithDispatch} from 'feathers-redux';
//CSS
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//Components
import App from './components/App';

//Service Worker 
import * as serviceWorker from './serviceWorker';

//Feathers Configuration 
export const feathersClient = feathers()
    .configure(feathers.socketio(io()))
    .configure(feathers.hooks())
    .configure(feathers.authentication({
        storage:window.localStorage
    }));

//Configure Redux
const rawServices = reduxifyServices(feathersClient, ['users', 'escape-rooms']);
const store = configureStore(rawServices,{user:{},escapeRooms:[],videos:[]});
const services = bindWithDispatch(store.dispatch, rawServices);

//Router
const router = (
    <Provider store={store}>
            <BrowserRouter>
                <App feathersClient={feathersClient} services={services} getServicesStatus={getServicesStatus}/>
            </BrowserRouter>
    </Provider>
);

//Render Router 
ReactDOM.render(router, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

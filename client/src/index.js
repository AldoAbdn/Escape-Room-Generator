/**
 * Main file, starts front end and renders App 
 * @author Alistair Quinn
 */
//Polyfills
import 'react-app-polyfill/ie9';
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
import feathers from '@feathersjs/client';
//Feathers-Redux
import reduxifyServices, {getServicesStatus, bindWithDispatch} from 'feathers-redux';
//CSS
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//Components
import App from './components/App';
//Service Worker 
import * as serviceWorker from './serviceWorker';
//ReactDnD
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import MultiBackend, { TouchTransition } from 'react-dnd-multi-backend';
import { DragDropContextProvider } from 'react-dnd';
let pipline = {
    backends: [
        {backend: HTML5Backend},
        {
            backend: TouchBackend({enableMouseEvents:true}),
            preview: true,
            transition: TouchTransition
        }
    ]
};
let backend = MultiBackend(pipline);

//Feathers Configuration 
export const feathersClient = feathers()
    .configure(feathers.socketio(io()))
    .configure(feathers.authentication({
        storage:window.localStorage
    }));

//Configure Redux
const rawServices = reduxifyServices(feathersClient, ['users', 'escape-rooms']);
const store = configureStore(rawServices,{user:{},escapeRooms:[],escapeRoom:{}});
const services = bindWithDispatch(store.dispatch, rawServices);

//Router
const router = (
    <DragDropContextProvider backend={backend}>
        <Provider store={store}>
            <BrowserRouter>
                <App feathersClient={feathersClient} services={services} getServicesStatus={getServicesStatus}/>
            </BrowserRouter>
        </Provider>
    </DragDropContextProvider>
);

//Render Router 
ReactDOM.render(router, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

//React Imports 
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Router, IndexRedirect, browserHistory } from 'react-router';
//Redux Imports
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
//Store 
import { configureServices } from './store/store'
//Feathers
import io from 'socket.io-client';
import feathers from 'feathers-client';
//Feathers-Redux
import reduxifyServices from 'feathers-redux';
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
const services = reduxifyServices(feathersClient, ['users', 'messages']);
const store = configureStore(services);
const history = syncHistoryWithStore(browserHistory,store);

//Router
const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRedirect to="/dashboard"/>
                <ProtectedRoute path="/dashboard" component={Dashboard}/>
                <ProtectedRoute path="/profile" component={Profile}/>
                <ProtectedRoute path="/designer" component={EscapeRoomDesigner}/>
                <Route path="/login" component={Login}></Route>
                <Route path="/signup" component={signup}></Route>
                <Route path="/about" component={about}></Route>
                <Route path="/tutorials" component={tutorials}></Route>
            </Route>
        </Router>
    </Provider>
);

//Render Router 
ReactDOM.render(router, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

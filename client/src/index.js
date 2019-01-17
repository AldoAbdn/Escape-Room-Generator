//React Imports 
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Router, IndexRedirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
//Store
import store, { history } from './store'
//CSS
import './index.css';
//Components
import App from './components/App';
//Service Worker 
import * as serviceWorker from './serviceWorker';

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

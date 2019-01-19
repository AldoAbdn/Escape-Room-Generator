import React, {Component}  from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter, Redirect } from 'react-router-dom';
//Components
import { App, Dashboard, EscapeRoomDesigner, Login, Signup, Tutorials, About, ProtectedRoute, Profile } from '../components/index.js';
class Main extends Component {
    render() {
        return (
            <div className="main container">
                <header>
                    <h1 className="title">
                        <a href="/">Escape Room Generator</a>
                    </h1>
                </header>
                <div>
                    <Switch>
                        <Redirect exact from="/" to="dashboard"/>
                        <Route path="/dashboard" render={(routeProps) => (<Dashboard {...this.props}/>)}/>
                        <ProtectedRoute path="/profile" component={Profile}/>
                        <ProtectedRoute path="/designer" component={EscapeRoomDesigner}/>
                        <Route path="/login" render={(routeProps) => (<Login {...this.props}/>)}/>
                        <Route path="/signup" render={(routeProps) => (<Signup {...this.props}/>)}/>
                        <Route path="/about" render={(routeProps) => (<About {...this.props}/>)}/>
                        <Route path="/tutorials" render={(routeProps) => (<Tutorials {...this.props}/>)}/>
                    </Switch> 
                </div>
                <footer>
                    <a href="/about">About</a>
                    <a href="/tutorials">Tutorials</a>
                </footer>
            </div>
        )
    }
};

export default Main;
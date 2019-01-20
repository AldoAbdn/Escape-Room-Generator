import React, {Component}  from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col} from 'reactstrap';
//Components
import { Dashboard, EscapeRoomDesigner, Login, Signup, Tutorials, About, ProtectedRoute, Profile } from '../components/index.js';
class Main extends Component {
    render() {
        return (
            <div>
                <header>
                    <h1 className="title">
                        <Link to="/">Escape Room Generator</Link>
                    </h1>
                </header>
                <main>
                    <Switch>
                        <Redirect exact from="/" to="dashboard"/>
                        <ProtectedRoute path="/dashboard" render={(routeProps) => (<Dashboard {...this.props}/>)}/>
                        <ProtectedRoute path="/profile" component={Profile}/>
                        <ProtectedRoute path="/designer" component={EscapeRoomDesigner}/>
                        <Route path="/login" render={(routeProps) => (<Login {...this.props}/>)}/>
                        <Route path="/signup" render={(routeProps) => (<Signup {...this.props}/>)}/>
                        <Route path="/about" render={(routeProps) => (<About {...this.props}/>)}/>
                        <Route path="/tutorials" render={(routeProps) => (<Tutorials {...this.props}/>)}/>
                    </Switch> 
                </main>
                <footer>
                    <Link to="/about">About</Link>
                    <Link to="/tutorials">Tutorials</Link>
                </footer>
            </div>
        )
    }
};

export default Main;
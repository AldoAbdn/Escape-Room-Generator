import React, {Component}  from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
//Components
import { Dashboard, EscapeRoomDesigner, Login, Signup, Tutorials, About, ProtectedRoute, Profile } from '../components/index.js';
class Main extends Component {
    constructor(){
        super();
        this.state = {profile:null};
    }
    populateUser = async () => {
        await this.props.feathersClient.authenticate()
          .then(response => {
            return this.props.feathersClient.passport.verifyJWT(response.accessToken);
          })
          .then(payload => {
            return this.props.services.users.get(payload.userId);
          })
          .then(user => {
            user.token = window.localStorage.getItem('feathers-jwt');
            this.props.redux.actions.login(user);
            this.setState({profile:  
                <div className="profile" >
                    <Link to="/profile">Profile</Link>
                    <Button onClick={this.logout}>Logout</Button>
                </div>});
            //Get Escape Rooms 
            this.populateEscapeRooms(user._id);
          })
          .catch(error => {
            this.logout();
          });
    }
    populateEscapeRooms = async (userId) => {
        //Get User Details and Update Redux Store
        if (userId != null && userId != undefined)
        this.props.services['escape-rooms'].find({query:{userId:userId}})
        .then((queryResult)=>{
            if(queryResult.action.type.includes('FULFILLED')){
                const escapeRooms = queryResult.value.data;
                if (escapeRooms!=null && escapeRooms!=undefined)
                    this.props.redux.actions.updateEscapeRooms(escapeRooms);
                    this.setState({loading:false});
                }
        });
    }
    logout = () => {
        window.localStorage.removeItem('feathers-jwt');
        this.props.redux.actions.logout();
        this.props.history.push('/');
    }
    componentDidMount() {
        if (window.localStorage.getItem('feathers-jwt') && this.props.redux.state.email!=undefined){
            this.setState({profile:  
            <div className="profile" >
                <Link to="/profile">Profile</Link>
                <Button onClick={this.logout}>Logout</Button>
            </div>});
        } else if (window.localStorage.getItem('feathers-jwt') && this.props.redux.state.email==undefined){
            this.populateUser();
        }
    }
    render() {
        return (
            <div>
                <header>
                    <h1 className="title">
                        <Link to="/">Escape Room Generator</Link>
                    </h1>
                   {this.state.profile}
                </header>
                <main>
                    <Switch>
                        <Redirect exact from="/" to="dashboard"/>
                        <ProtectedRoute path="/dashboard" render={(routeProps) => (<Dashboard {...this.props}/>)}/>
                        <ProtectedRoute path="/profile" render={(routeProps) => (<Profile {...this.props}/>)}/>
                        <ProtectedRoute path="/designer/:id" render={(routeProps) => {
                            var props = {...this.props, ...routeProps};
                            return(<EscapeRoomDesigner {...props}/>)
                        }}/>
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
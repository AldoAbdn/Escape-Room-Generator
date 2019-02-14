import React, {Component}  from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import '../styles/Main.css';

/**
 * Defines main layout of app 
 * Handles re-authentication of logged in user 
 * Renders business logic 
 * @class Main 
 * @author Alistair Quinn
 */
import BusinessLogic from './BusinessLogic.js';
class Main extends Component {
    /**
     * Main constructor to set initial state
     * @constructor
     */
    constructor(){
        super();
        this.state = {profile:null};
    }
    /**
     * React lifecycle method
     * Updates profile if user has changed
     * @function
     * @param {Object} prevProps 
     */
    componentDidUpdate(prevProps){
        if(prevProps.redux.state.user.email!==this.props.redux.state.user.email){
            this.populateEscapeRooms(this.props.redux.state.user._id);
            if(this.props.redux.state.user.email !== undefined){
                this.setProfile(true);
            } else {
                this.setProfile(false);
            }
        }
    }
    /**
     * React lifecycle method 
     * Updates profile is logged in
     * @function
     */
    componentDidMount() {
        if (window.localStorage.getItem('feathers-jwt') && this.props.redux.state.user.email!==undefined){
            this.setProfile(true);
        } else if (window.localStorage.getItem('feathers-jwt') && this.props.redux.state.user.email===undefined){
            this.authenticate();
        }
    }
    /**
     * Authentication
     * @function
     */
    authenticate = async() => {
        //Authenticates JWT and then populates user/escapeRooms
        let jwt = await this.authenticateJWT();
        let user = await this.populateUserFromJWT(jwt);
        await this.populateEscapeRooms(user._id);
    }
    /**
     * Authenticates JWT 
     * @function 
     * @returns string
     */
    authenticateJWT = async() => {
        try {
            let response = await this.props.feathersClient.authenticate();
            return response.accessToken;
        } catch(error) {
            this.logout();
        }
    }
    /**
     * Populates user from a jwt
     * @function
     * @param {String} jwt 
     * @returns {Object}
     */
    populateUserFromJWT = async(jwt) => {
        let response = await this.props.feathersClient.passport.verifyJWT(jwt);
        response = await this.props.services.users.get(response.userId);
        var user = response.value;
        user.token = window.localStorage.getItem('feathers-jwt');
        this.props.redux.actions.login(user);
        this.setProfile(true);
        return user;
    }
    /**
     * Popultes escape rooms by user ID
     * @function
     * @param {String} userId
     * @returns {Array}
     */
    populateEscapeRooms = async (userId) => {
        //Get User Details and Update Redux Store
        if (userId !== null && userId !== undefined){
            let queryResult = await this.props.services['escape-rooms'].find({query:{userId:userId}});
            if(queryResult.action.type.includes('FULFILLED')){
                const escapeRooms = queryResult.value.data;
                if (escapeRooms!==null && escapeRooms!==undefined)
                    this.props.redux.actions.updateEscapeRooms(escapeRooms);
                    this.setState({loading:false});
                }
        }
    }
    /**
     * Logs out user, tidys up
     * @function
     */
    logout = () => {
        window.localStorage.removeItem('feathers-jwt');
        this.setState({profile:null});
        this.props.redux.actions.logout();
        this.props.history.push('/');
    }
    /**
     * Hides/shows user profile 
     * dependent on login status
     * @param {Boolean} loggedIn 
     */
    setProfile(loggedIn){
        let state;
        if(loggedIn){
            state = 
            <div className="profile" >
                <Link to="/profile">Profile</Link>
                <Button onClick={this.logout}>Logout</Button>
            </div>
        } else {
            state = null;
        }
        this.setState({profile:state});
    }
    /**
     * React lifecycle method 
     * Renders main layout
     * @function
     * @returns {JSX}
     */
    render() {
        const loading = this.state.loading || this.props.redux.state.usersService.isLoading || this.props.redux.state.escapeRoomsService.isLoading;
        return (
                <div>   
                    <LoadingOverlay className={'loading-overlay'} active={loading} spinner>       
                        <header>
                            <h1 className="title">
                                <Link to="/">Escape Room Generator</Link>
                            </h1>
                        {this.state.profile}
                        </header>
                        
                        <main>
                            <BusinessLogic history={this.props.history} feathersClient={this.props.feathersClient} redux={this.props.redux} services={this.props.services}/>
                        </main>
                        <footer>
                            <Link to="/about">About</Link>
                            <Link to="/tutorials">Tutorials</Link>
                        </footer>
                    </LoadingOverlay>
                </div>
        )
    }
};

export default Main;